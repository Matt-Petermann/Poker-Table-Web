import { createContext, useCallback, useContext, useState } from "react";
import type { Player } from "@/types/player";

interface ITableContext {
    /** Seat number where the button is located. */
    buttonPosition: Readonly<number>;
    /** Set the seat number of where the button is located. */
    handleChangeButtonPosition: (position: number) => void;
    /** All players at the table. */
    players: Readonly<Player[]>;
    /** Update the active players array. */
    handleUpdatePlayers: (id: number, newPlayer: Player) => void;
}

const initialContext: ITableContext = {
    buttonPosition: 0,
    handleChangeButtonPosition: () => {},
    players: (Array.from(Array(10).keys())).map(id => ({ id, name: null, isActive: true })),
    handleUpdatePlayers: () => {}
};

const TableContext = createContext<ITableContext>(initialContext);
export const useTableContext = () => useContext(TableContext);

export const TableContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [values, setValues] = useState<ITableContext>(initialContext);

    /**
     * Update the location of the button.
     * @param newPosition New seat number to place the button at.
     */
    const handleChangeButtonPosition = useCallback((newPosition: number) => {
        setValues(prevValues => ({ ...prevValues, buttonPosition: newPosition }))
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

    return (
        <TableContext.Provider value={{ ...values, handleChangeButtonPosition, handleUpdatePlayers }}>
            {children}
        </TableContext.Provider>
    );
};
