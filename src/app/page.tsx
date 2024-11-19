"use client";

import { useCallback } from "react";
import { Avatar, Button, ButtonGroup, Card, Modal, ModalBody, ModalContent, ModalFooter, Skeleton, useDisclosure } from "@nextui-org/react";
import { FaArrowRightLong, FaArrowRotateLeft, FaCheck, FaTrash, FaUserShield } from "react-icons/fa6";

import { Avatars } from "@/lib/avatars";
import { useTableContext } from "@/contexts/tableContext";
import { PlayerAvatar } from "@/components/playerAvatar";
import table from "@/public/img/table.png";

export default () => {
    const { buttonPosition, handleChangeButtonPosition, players, handleUpdatePlayers } = useTableContext();
    const { isOpen, onOpenChange, onClose } = useDisclosure();

    /**
     * Update button location to next available seat.
     */
    const handleMoveButton = useCallback(() => {
        // Start the button one seat clockwise
        let targetPosition = buttonPosition + 1 === 10 ? 0 : buttonPosition + 1;

        // Rotate around the table until an active seat is found
        while (!players.some(player => player.isActive && player.id === targetPosition))
            if (targetPosition === 9)
                targetPosition = 0;
            else
                targetPosition++;
            
        // Update the button position to the first active seat
        handleChangeButtonPosition(targetPosition);
    }, [buttonPosition, players]);

    /**
     * Reset all the players and cards at the table and return the button to the starting position.
     */
    const handleResetTable = useCallback(() => {
        // Return the button to the starting position
        handleChangeButtonPosition(0);

        // Reset every player in the game
        (Array.from(Array(10).keys())).forEach(id => {
            handleUpdatePlayers(id, {
                id,
                name: null,
                isActive: true
            })
        });

        // TODO: Reset the cards on the board

        onClose();
    }, []);

    return (
        <main>
            <Button
                as="a"
                className="fixed top-2 right-2 z-10"
                endContent={<FaUserShield />}
                href="/admin"
            >
                Admin Portal
            </Button>
            <div className="relative h-[100vh] pt-[10vw]">
                {/** Table */}
                <img
                    src={table.src}
                    className="w-[50vw] h-[25vw] ml-auto mr-auto"
                />

                {/** Player Avatars */}
                {Avatars.map((avatar, idx) => (
                    <PlayerAvatar player={players[idx]} avatar={avatar} key={idx} />
                ))}

                {/** Dealer Button */}
                <Avatar
                    name="BTN"
                    style={{
                        position: "absolute",
                        width: "2.5vw",
                        height: "2.5vw",
                        backgroundColor: "white",
                        color: "black",
                        left: `${Avatars[buttonPosition].buttonX}vw`,
                        top: `${Avatars[buttonPosition].buttonY}vw`,
                        transition: "all .25s ease-out"
                    }}
                />

                {/** Flop */}
                <Skeleton
                    isLoaded={false}
                    className="absolute z-10 rounded-md"
                    style={{
                        left: "32.5vw",
                        top: "19vw"
                    }}
                >
                    <div className="w-[5vw] h-[7vw] p-4 bg-neutral-600">
                        <FaCheck className="w-full h-full text-green-500" />
                    </div>
                </Skeleton>
                <Skeleton
                    isLoaded={false}
                    className="absolute z-10 rounded-md"
                    style={{
                        left: "40vw",
                        top: "19vw"
                    }}
                >
                    <div className="w-[5vw] h-[7vw] p-4 bg-neutral-600">
                        <FaCheck className="w-full h-full text-green-500" />
                    </div>
                </Skeleton>
                <Skeleton
                    isLoaded={false}
                    className="absolute z-10 rounded-md"
                    style={{
                        left: "47.5vw",
                        top: "19vw"
                    }}
                >
                    <div className="w-[5vw] h-[7vw] p-4 bg-neutral-600">
                        <FaCheck className="w-full h-full text-green-500" />
                    </div>
                </Skeleton>

                {/** Turn */}
                <Skeleton
                    isLoaded={false}
                    className="absolute z-10 rounded-md"
                    style={{
                        left: "55vw",
                        top: "19vw"
                    }}
                >
                    <div className="w-[5vw] h-[7vw] p-4 bg-neutral-600">
                        <FaCheck className="w-full h-full text-green-500" />
                    </div>
                </Skeleton>

                {/** River */}
                <Skeleton
                    isLoaded={false}
                    className="absolute z-10 rounded-md"
                    style={{
                        left: "62.5vw",
                        top: "19vw"
                    }}
                >
                    <div className="w-[5vw] h-[7vw] p-4 bg-neutral-600">
                        <FaCheck className="w-full h-full text-green-500" />
                    </div>
                </Skeleton>
            </div>

            {/** Bottom Controls */}
            <Card
                isBlurred
                className="fixed left-12 right-12 bottom-4"
            >
                <div>
                    <Button
                        size="lg"
                        variant="ghost"
                        radius="full"
                        color="danger"
                        className="font-bold ml-6"
                        startContent={<FaTrash />}
                        onClick={onOpenChange}
                    >
                        Reset Table
                    </Button>
                    <ButtonGroup
                        size="lg"
                        radius="full"
                        className="m-6"
                    >
                        <Button
                            variant="ghost"
                            color="warning"
                            className="font-bold"
                            startContent={<FaArrowRotateLeft />}
                        >
                            Undo Last Card
                        </Button>
                        <Button
                            variant="ghost"
                            color="danger"
                            className="font-bold"
                            endContent={<FaTrash />}
                        >
                            Reset Hand
                        </Button>
                    </ButtonGroup>
                    <Button
                        className="float-right m-6 font-bold"
                        variant="ghost"
                        color="success"
                        size="lg"
                        radius="full"
                        endContent={<FaArrowRightLong />}
                        onClick={() => handleMoveButton()}
                    >
                        Next Hand
                    </Button>
                </div>
            </Card>

            {/** Confirm Reset Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent className="bg-opacity-50 backdrop-blur-md">
                    <ModalBody className="text-center">
                        <h1 className="font-semibold">Are you sure you want to reset the table?</h1>
                        <h2>This action cannot be undone.</h2>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <Button
                            variant="ghost"
                            color="success"
                            size="lg"
                            radius="full"
                            onClick={onOpenChange}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="ghost"
                            color="danger"
                            size="lg"
                            radius="full"
                            onClick={handleResetTable}
                        >
                            Reset
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </main>
    );
}
