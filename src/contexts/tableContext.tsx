import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Player } from "@/types/player";

const LS_KEY_PLAYERS = "players";
const LS_KEY_BUTTON_POSITION = "button-position";

const defaultButtonPosition = 0;
const defaultPlayers = (Array.from(Array(10).keys())).map(id => ({ id, name: null, isActive: true }));

type ConnectionStatus = "loading" | "error" | "success";

type TableValues = {
    /** Seat number where the button is located. */
    buttonPosition: Readonly<number>;
    /** All players at the table. */
    players: Readonly<Player[]>;
}

type TableContext = {
    /** Whether the table is still loading values. */
    isLoading: Readonly<boolean>;
    /** Current status of the connection to the microservice. */
    connectionStatus: Readonly<ConnectionStatus>;
    /** Set the seat number of where the button is located. */
    handleChangeButtonPosition: (position: number) => void;
    /** Update the active players array. */
    handleUpdatePlayers: (id: number, newPlayer: Player) => void;
    /** Reset all players on the table and return the button to the starting location. */
    handleResetTable: () => void;
} & TableValues;

const initialValues: TableValues = {
    buttonPosition: defaultButtonPosition,
    players: structuredClone(defaultPlayers)
}

const initialContext: TableContext = {
    ...initialValues,
    isLoading: true,
    connectionStatus: "loading",
    handleChangeButtonPosition: () => {},
    handleUpdatePlayers: () => {},
    handleResetTable: () => {}
};

const TableContext = createContext<TableContext>(initialContext);
export const useTableContext = () => useContext(TableContext);

export const TableContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [values, setValues] = useState<TableValues>(initialValues);
    const [isLoading, setIsLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("loading");

    /**
     * Update the location of the button.
     * @param newPosition New seat number to place the button at.
     */
    const handleChangeButtonPosition = useCallback((newPosition: number) => {
        if(newPosition >= 0 && newPosition < 10) {
            setValues(prevValues => ({ ...prevValues, buttonPosition: newPosition }));
            localStorage.setItem(LS_KEY_BUTTON_POSITION, String(newPosition));
        }
        else
            throw new Error("Button must be in [0,9]");
    }, []);

    /**
     * Update the active players array.
     * @param id Target ID of the player to update.
     * @param newPlayer Updated player object to replace.
     */
    const handleUpdatePlayers = useCallback((id: number, newPlayer: Player) => {
        setValues(prevValues => {
            const newPlayers = prevValues.players.map(player => {
                if(player.id === id)
                    return newPlayer;
                return player;
            });
            localStorage.setItem(LS_KEY_PLAYERS, JSON.stringify(newPlayers));

            return {
                ...prevValues,
                players: newPlayers
            }
        });
    }, []);

    /**
     * Clear the player data and return the button to starting position.
     */
    const handleResetTable = useCallback(() => {
        setValues({
            buttonPosition: defaultButtonPosition,
            players: structuredClone(defaultPlayers)
        });
        localStorage.setItem(LS_KEY_BUTTON_POSITION, String(defaultButtonPosition));
        localStorage.setItem(LS_KEY_PLAYERS, JSON.stringify(defaultPlayers));
    }, []);

    /** When the component mounts, check local storage for values. */
    useEffect(() => {
        const storedButtonPosition = localStorage.getItem(LS_KEY_BUTTON_POSITION);
        const storedPlayers = localStorage.getItem(LS_KEY_PLAYERS);

        // If there is stored user data, load it into state
        if(storedButtonPosition && storedPlayers)
            setValues({
                buttonPosition: Number(storedButtonPosition),
                players: JSON.parse(storedPlayers)
            });
        // Otherwise, create defaults to local storage
        else {
            localStorage.setItem(LS_KEY_BUTTON_POSITION, String(defaultButtonPosition));
            localStorage.setItem(LS_KEY_PLAYERS, JSON.stringify(defaultPlayers));
        }

        // Disable the loading state
        setIsLoading(false);
    }, []);

    /** When the component mounts, open the event source for reading cards. */
    useEffect(() => {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/dealer`);
        eventSource.onmessage = e => {
            console.log(e.data)
        };
        eventSource.onerror = () => setConnectionStatus("error");
        eventSource.onopen = () => setConnectionStatus("success");

        // If there is no error after 10 seconds, set the status to "success"
        setTimeout(() => {
            setConnectionStatus(currentStatus => {
                if(currentStatus === "loading")
                    return "success";
                return currentStatus;
            });
        }, 10000);

        return () => eventSource.close();
    }, []);

    return (
        <TableContext.Provider
            value={{
                ...values,
                isLoading,
                connectionStatus,
                handleChangeButtonPosition,
                handleUpdatePlayers,
                handleResetTable
            }}
        >
            {children}
        </TableContext.Provider>
    );
};
