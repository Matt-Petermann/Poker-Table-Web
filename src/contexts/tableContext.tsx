import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Player } from "@/types/player";
import type { CardHash } from "@/types/cardHash";

const LS_KEY_PLAYERS = "players";
const LS_KEY_BUTTON_POSITION = "button-position";
const LS_KEY_CARD_HASHES = "card-hashes";

const defaultButtonPosition = 0;
const defaultPlayers: Player[] =
    (Array.from(Array(10).keys())).map(id => ({
        id,
        name: null,
        isActive: true
    }));
const defaultCardHashes: CardHash[] =
    (Array.from(Array(52).keys())).map(index => ({
        index,
        hash: null
    }));

enum ConnectionStatus { LOADING, ERROR, SUCCESS };

type TableValues = {
    /** Seat number where the button is located. */
    buttonPosition: Readonly<number>;
    /** All players at the table. */
    players: Readonly<Player[]>;
    /** Hashes assigned to each card index. */
    cardHashes: Readonly<CardHash[]>;
}

type TableContext = {
    /** Whether the table is still loading values. */
    isLoading: Readonly<boolean>;
    /** Current status of the connection to the microservice. */
    connectionStatus: Readonly<ConnectionStatus>;
    /** Scanned card hashes that have not yet been read. */
    newlyScannedCards: Readonly<string[]>;
    /** Set the seat number of where the button is located. */
    handleChangeButtonPosition: (position: number) => void;
    /** Update the active players array. */
    handleUpdatePlayer: (newPlayer: Player) => void;
    /** Reset all players on the table and return the button to the starting location. */
    handleResetTable: () => void;
    /** Update a single card in the array. */
    handleUpdateCardHash: (index: number, hash: string | null) => void;
    /** Update all cards in the array. */
    handleUpdateCardHashes: (cardHashes: CardHash[]) => void;
    /** Return all cards in the array to default. */
    handleDeleteCardHashes: () => void;
    /** Remove the last element from the newly scanned cards. */
    handlePopNewlyScannedCards: () => void;
} & TableValues;

const initialValues: TableValues = {
    buttonPosition: defaultButtonPosition,
    players: structuredClone(defaultPlayers),
    cardHashes: structuredClone(defaultCardHashes)
}

const initialContext: TableContext = {
    ...initialValues,
    isLoading: true,
    connectionStatus: ConnectionStatus.LOADING,
    newlyScannedCards: [],
    handleChangeButtonPosition: () => {},
    handleUpdatePlayer: () => {},
    handleResetTable: () => {},
    handleUpdateCardHash: () => {},
    handleUpdateCardHashes: () => {},
    handleDeleteCardHashes: () => {},
    handlePopNewlyScannedCards: () => {}
};

const TableContext = createContext<TableContext>(initialContext);
export const useTableContext = () => useContext(TableContext);

export const TableContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [values, setValues] = useState<TableValues>(initialValues);
    const [isLoading, setIsLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.LOADING);
    const [newlyScannedCards, setNewlyScannedCards] = useState<string[]>([]);

    /**
     * Update the location of the button.
     * @param newPosition New seat number to place the button at.
     */
    const handleChangeButtonPosition = useCallback((buttonPosition: number) => {
        if (buttonPosition >= 0 && buttonPosition < 10) {
            setValues(prevValues => ({
                ...prevValues,
                buttonPosition
            }));
            localStorage.setItem(LS_KEY_BUTTON_POSITION, String(buttonPosition));
        }
        else {
            throw new Error("Button must be in [0,9].");
        }
    }, []);

    /**
     * Update the active players array.
     * @param id Target ID of the player to update.
     * @param newPlayer Updated player object to replace.
     */
    const handleUpdatePlayer = useCallback((newPlayer: Player) => {
        setValues(prevValues => {
            const newPlayers = prevValues.players.map(player => {
                if (player.id === newPlayer.id) {
                    return newPlayer;
                }
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
        setValues(prevValues => ({
            buttonPosition: defaultButtonPosition,
            players: structuredClone(defaultPlayers),
            cardHashes: prevValues.cardHashes
        }));
        localStorage.setItem(LS_KEY_BUTTON_POSITION, String(defaultButtonPosition));
        localStorage.setItem(LS_KEY_PLAYERS, JSON.stringify(defaultPlayers));
    }, []);

    /**
     * Update a single card in the array.
     * @param index Index of the card to update.
     * @param hash New hash to assign to the target index.
     */
    const handleUpdateCardHash = useCallback((index: number, hash: string | null) => {
        setValues(prevValues => {
            const newCardHashes = prevValues.cardHashes.map(cardHash => {
                if (cardHash.index === index) {
                    return { index, hash };
                }
                return cardHash;
            });
            localStorage.setItem(LS_KEY_CARD_HASHES, JSON.stringify(newCardHashes));

            return {
                ...prevValues,
                cardHashes: newCardHashes
            }
        });
    }, []);

    /**
     * Update all card hashes in the array.
     * @param cardHashes New array of card hashes.
     */
    const handleUpdateCardHashes = useCallback((cardHashes: CardHash[]) => {
        setValues(prevValues => ({
            ...prevValues,
            cardHashes
        }));
        localStorage.setItem(LS_KEY_CARD_HASHES, JSON.stringify(cardHashes));
    }, []);

    /**
     * Return all card hashes to the default values.
     */
    const handleDeleteCardHashes = useCallback(() => {
        setValues(prevValues => ({
            ...prevValues,
            cardHashes: structuredClone(defaultCardHashes)
        }));
        localStorage.setItem(LS_KEY_CARD_HASHES, JSON.stringify(structuredClone(defaultCardHashes)));
    }, []);

    /**
     * Remove the last element from the newly scanned cards.
     */
    const handlePopNewlyScannedCards = useCallback(() => {
        setNewlyScannedCards(prev => prev.toSpliced(prev.length - 1, 1));
    }, []);

    /** When the component mounts, check local storage for values. */
    useEffect(() => {
        const storedButtonPosition = localStorage.getItem(LS_KEY_BUTTON_POSITION);
        const storedPlayers = localStorage.getItem(LS_KEY_PLAYERS);
        const storedCardHashes = localStorage.getItem(LS_KEY_CARD_HASHES);

        // If there is stored user data, load it into state
        if (storedButtonPosition && storedPlayers && storedCardHashes) {
            setValues({
                buttonPosition: Number(storedButtonPosition),
                players: JSON.parse(storedPlayers),
                cardHashes: JSON.parse(storedCardHashes)
            });
        }
        // Otherwise, create defaults to local storage
        else {
            localStorage.setItem(LS_KEY_BUTTON_POSITION, String(defaultButtonPosition));
            localStorage.setItem(LS_KEY_PLAYERS, JSON.stringify(defaultPlayers));
            localStorage.setItem(LS_KEY_CARD_HASHES, JSON.stringify(defaultCardHashes));
        }

        // Disable the loading state
        setIsLoading(false);
    }, []);

    /** When the component mounts, open the event source for reading cards. */
    useEffect(() => {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/dealer`);
        eventSource.onmessage = e => setNewlyScannedCards(prev => [...prev, e.data]);
        eventSource.onerror = () => setConnectionStatus(ConnectionStatus.ERROR);
        eventSource.onopen = () => setConnectionStatus(ConnectionStatus.SUCCESS);

        // If there is no error after 10 seconds, set the status to "success"
        setTimeout(() => {
            setConnectionStatus(currentStatus => {
                if (currentStatus === ConnectionStatus.LOADING) {
                    return ConnectionStatus.SUCCESS;
                }
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
                newlyScannedCards,
                handleChangeButtonPosition,
                handleUpdatePlayer,
                handleResetTable,
                handleUpdateCardHash,
                handleUpdateCardHashes,
                handleDeleteCardHashes,
                handlePopNewlyScannedCards
            }}
        >
            {children}
        </TableContext.Provider>
    );
};
