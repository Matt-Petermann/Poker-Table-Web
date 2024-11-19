import { useRef, useState } from "react";
import { Avatar, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@nextui-org/react";
import { FaCheck, FaCircleRight, FaClock, FaPencil, FaRegClock } from "react-icons/fa6";

import { CustomAvatar } from "@/lib/avatars";
import { useTableContext } from "@/app/contexts/tableContext";
import EditPlayerModal, { EditPlayerModalRef } from "./editPlayerModal";

interface PlayerAvatar {
    /** Custom avatar properties for table arrangement. */
    avatar: CustomAvatar;
}

export default function PlayerAvatar({ avatar }: PlayerAvatar) {
    const { avatarX, avatarY, seatNumber, playerName } = avatar;

    const [isOpen, setIsOpen] = useState(false);

    const editPlayerModalRef = useRef<EditPlayerModalRef>(null);

    const { setButtonPosition, activePlayers } = useTableContext();

    /**
     * Move button to this seat.
     */
    const moveButton = () => {
        setButtonPosition(seatNumber);
        setIsOpen(false);
    };

    /**
     * Open the modal to edit player info.
     */
    const openEditPlayerModal = () => {
        editPlayerModalRef.current?.openModal();
        setIsOpen(false);
    };

    /**
     * Flag this player as sitting out.
     */
    const sitPlayerOut = () => {
        activePlayers.splice(activePlayers.indexOf(seatNumber), 1);
        setIsOpen(false);
    };

    /**
     * Set this player to active in the game.
     */
    const returnPlayer = () => {
        activePlayers.push(seatNumber);
        setIsOpen(false);
    };

    return (
        <>
            <EditPlayerModal
                ref={editPlayerModalRef}
                avatar={avatar}
            />
            <Popover
                showArrow
                size="lg"
                isOpen={isOpen}
                onOpenChange={open => setIsOpen(open)}
            >
                <PopoverTrigger>
                    <Avatar
                        name={
                            playerName
                                ? playerName
                                      .match(/\b(\w)/g)
                                      ?.join("")
                                      .toUpperCase()
                                : undefined
                        }
                        className={`hover:cursor-pointer absolute w-[5vw] h-[5vw] text-3xl ${
                            activePlayers.includes(seatNumber)
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
                    <Listbox>
                        <ListboxItem
                            key="edit"
                            startContent={<FaPencil />}
                            className="text-xl"
                            onClick={openEditPlayerModal}
                        >
                            <p className="text-xl">Edit player name</p>
                        </ListboxItem>
                        <ListboxItem
                            key="move"
                            startContent={<FaCircleRight />}
                            className="text-xl"
                            onClick={moveButton}
                        >
                            <p className="text-xl">Move button here</p>
                        </ListboxItem>
                        <ListboxItem
                            key="dropout"
                            startContent={<FaRegClock />}
                            className={`text-xl ${
                                activePlayers.includes(seatNumber)
                                    ? ""
                                    : "hidden"
                            }`}
                            onClick={sitPlayerOut}
                        >
                            <p className="text-xl">Sit player out</p>
                        </ListboxItem>
                        <ListboxItem
                            key="return"
                            startContent={<FaClock />}
                            className={`text-xl ${
                                activePlayers.includes(seatNumber)
                                    ? "hidden"
                                    : ""
                            }`}
                            onClick={returnPlayer}
                        >
                            <p className="text-xl">Return player</p>
                        </ListboxItem>
                    </Listbox>
                </PopoverContent>
            </Popover>
            <div className={activePlayers.includes(seatNumber) ? "" : "hidden"}>
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
}
