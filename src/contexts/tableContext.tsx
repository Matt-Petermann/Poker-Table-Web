import { createContext, useCallback, useContext, useState } from "react";
import type { Player } from "@/types/player";

const defaultButtonPosition = 0;
const defaultPlayers = (Array.from(Array(10).keys())).map(id => ({ id, name: null, isActive: true }));

const storedPlayers = localStorage.getItem("players");
const storedButtonPosition = Number(localStorage.getItem("button-position"));

type TableValues = {
    /** Seat number where the button is located. */
    buttonPosition: Readonly<number>;
    /** All players at the table. */
    players: Readonly<Player[]>;
}

type TableContext = {
    /** Set the seat number of where the button is located. */
    handleChangeButtonPosition: (position: number) => void;
    /** Update the active players array. */
    handleUpdatePlayers: (id: number, newPlayer: Player) => void;
    /** Reset all players on the table and return the button to the starting location. */
    handleResetTable: () => void;
} & TableValues;

const initialValues: TableValues = {
    buttonPosition: storedButtonPosition ?? defaultButtonPosition,
    players: storedPlayers as Player[] | null ?? structuredClone(defaultPlayers)
}

const initialContext: TableContext = {
    ...initialValues,
    handleChangeButtonPosition: () => {},
    handleUpdatePlayers: () => {},
    handleResetTable: () => {}
};

const TableContext = createContext<TableContext>(initialContext);
export const useTableContext = () => useContext(TableContext);

export const TableContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [values, setValues] = useState<TableValues>(initialValues);

    /**
     * Update the location of the button.
     * @param newPosition New seat number to place the button at.
     */
    const handleChangeButtonPosition = useCallback((newPosition: number) => {
        if(newPosition >= 0 && newPosition < 10)
            setValues(prevValues => ({ ...prevValues, buttonPosition: newPosition }));
        else
            throw new Error("Button must be in [0,9]");
    }, []);

    /**
     * Update the active players array.
     * @param id Target ID of the player to update.
     * @param newPlayer Updated player object to replace.
     */
    const handleUpdatePlayers = useCallback((id: number, newPlayer: Player) => {
        setValues(prevValues => ({
            ...prevValues,
            players: prevValues.players.map(player => {
                if(player.id === id)
                    return newPlayer;
                return player;
            })
        }));
    }, []);

    /**
     * Clear the player data and return the button to starting position.
     */
    const handleResetTable = useCallback(() => {
        setValues({
            buttonPosition: defaultButtonPosition,
            players: structuredClone(defaultPlayers)
        })
    }, []);

    return (
        <TableContext.Provider value={{ ...values, handleChangeButtonPosition, handleUpdatePlayers, handleResetTable }}>
            {children}
        </TableContext.Provider>
    );
};
