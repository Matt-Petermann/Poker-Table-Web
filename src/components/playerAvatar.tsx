import React, { useCallback, useRef, useState } from "react";
import { Avatar, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@nextui-org/react";
import { FaCheck, FaCircleRight, FaClock, FaPencil, FaRegClock } from "react-icons/fa6";

import type { Player } from "@/types/player";
import type { CustomAvatar } from "@/types/customAvatar";
import { useTableContext } from "@/contexts/tableContext";
import EditPlayerModal, { EditPlayerModalRef } from "./editPlayerModal";

interface PlayerAvatarProps {
    /** Data for the player at this seat. */
    player: Player;
    /** Custom avatar properties for table arrangement. */
    avatar: CustomAvatar;
}

export const PlayerAvatar = React.memo<PlayerAvatarProps>(({ player, avatar }) => {
    const { avatarX, avatarY, seatNumber } = avatar;
    const { players, handleChangeButtonPosition, handleUpdatePlayers } = useTableContext();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const editPlayerModalRef = useRef<EditPlayerModalRef>(null);

    /**
     * Move button to this seat.
     */
    const handleMoveButton = useCallback(() => {
        handleChangeButtonPosition(seatNumber);
        setIsPopoverOpen(false);
    }, []);

    /**
     * Open the modal to edit player info.
     */
    const handleOpenEditPlayerModal = useCallback(() => {
        editPlayerModalRef.current?.openModal();
        setIsPopoverOpen(false);
    }, []);

    /**
     * Flag this player as sitting out.
     */
    const handleSitPlayerOut = useCallback(() => {
        handleUpdatePlayers(seatNumber, {
            ...players.find(p => p.id === player.id)!,
            isActive: false
        })
        setIsPopoverOpen(false);
    }, [players]);

    /**
     * Set this player to active in the game.
     */
    const handleReturnPlayer = useCallback(() => {
        handleUpdatePlayers(seatNumber, {
            ...players.find(p => p.id === player.id)!,
            isActive: true
        })
        setIsPopoverOpen(false);
    }, [players]);

    return (
        <>
            <EditPlayerModal
                ref={editPlayerModalRef}
                player={player}
            />
            <Popover
                showArrow
                size="lg"
                isOpen={isPopoverOpen}
                onOpenChange={open => setIsPopoverOpen(open)}
            >
                <PopoverTrigger>
                    <Avatar
                        name={player.name?.match(/\b(\w)/g)?.join("").toUpperCase() ?? undefined}
                        className={`hover:cursor-pointer absolute w-[5vw] h-[5vw] text-3xl ${
                            player.isActive
                                ? "opacity-100"
                                : "opacity-15"
                        }`}
                        style={{
                            left: `${avatarX}vw`,
                            top: `${avatarY}vw`
                        }}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <Listbox aria-label="List">
                        <ListboxItem
                            key="edit"
                            startContent={<FaPencil />}
                            className="text-xl"
                            onClick={handleOpenEditPlayerModal}
                            aria-label="Edit"
                        >
                            <p className="text-xl">Edit player name</p>
                        </ListboxItem>
                        <ListboxItem
                            key="move"
                            startContent={<FaCircleRight />}
                            className="text-xl"
                            onClick={handleMoveButton}
                            aria-label="Move"
                        >
                            <p className="text-xl">Move button here</p>
                        </ListboxItem>
                        <ListboxItem
                            key="dropout"
                            startContent={<FaRegClock />}
                            className={`text-xl ${
                                player.isActive
                                    ? ""
                                    : "hidden"
                            }`}
                            onClick={handleSitPlayerOut}
                            aria-label="Sit Out"
                        >
                            <p className="text-xl">Sit player out</p>
                        </ListboxItem>
                        <ListboxItem
                            key="return"
                            startContent={<FaClock />}
                            className={`text-xl ${
                                player.isActive
                                    ? "hidden"
                                    : ""
                            }`}
                            onClick={handleReturnPlayer}
                            aria-label="Return"
                        >
                            <p className="text-xl">Return player</p>
                        </ListboxItem>
                    </Listbox>
                </PopoverContent>
            </Popover>
            <div className={player.isActive ? "" : "hidden"}>
                <Skeleton
                    isLoaded={false}
                    className="absolute w-[2.5vw] h-[3.5vw] z-10 rounded-md"
                    style={{
                        left: `${avatarX - 0.25}vw`,
                        top: `${avatarY + 3.5}vw`
                    }}
                >
                    <div className="w-[2.5vw] h-[3.5vw] p-2 bg-neutral-600">
                        <FaCheck className="w-full h-full text-green-500" />
                    </div>
                </Skeleton>
                <Skeleton
                    isLoaded={false}
                    className="absolute w-[2.5vw] h-[3.5vw] z-10 rounded-md"
                    style={{
                        left: `${avatarX + 2.75}vw`,
                        top: `${avatarY + 3.5}vw`
                    }}
                >
                    <div className="w-[2.5vw] h-[3.5vw] p-2 bg-neutral-600">
                        <FaCheck className="w-full h-full text-green-500" />
                    </div>
                </Skeleton>
            </div>
        </>
    );
});
