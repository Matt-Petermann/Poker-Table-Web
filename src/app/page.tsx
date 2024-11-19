"use client";

import { Avatar, Button, ButtonGroup, Card, Skeleton } from "@nextui-org/react";
import { FaArrowRightLong, FaArrowRotateLeft, FaCheck, FaTrash, FaUserShield } from "react-icons/fa6";

import PlayerAvatar from "@/components/playerAvatar";
import avatars from "@/lib/avatars";
import { useTableContext } from "@/contexts/tableContext";

import table from "@/public/img/table.png";

export default function Home() {
    const { buttonPosition, setButtonPosition, activePlayers } =
        useTableContext();

    /**
     * Update button location to next available seat.
     */
    const moveButton = () => {
        // Start the button one seat to the left
        let targetPosition = buttonPosition + 1 === 10 ? 0 : buttonPosition + 1;

        // Rotate around the table until an active seat is found
        while (!activePlayers.includes(targetPosition))
            if (targetPosition === 9) targetPosition = 0;
            else targetPosition++;

        // Update the button position to the first active seat
        setButtonPosition(targetPosition);
    };

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

                {/** Avatars */}
                {avatars.map(avatar => (
                    <PlayerAvatar avatar={avatar} />
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
                        left: `${avatars[buttonPosition].buttonX}vw`,
                        top: `${avatars[buttonPosition].buttonY}vw`,
                        transition: "all .25s ease-out"
                    }}
                />

                {/** Flop */}
                <Skeleton
                    isLoaded={false}
                    className="absolute w-[5vw] h-[7vw] z-10 rounded-md"
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
                    className="absolute w-[5vw] h-[7vw] z-10 rounded-md"
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
                    className="absolute w-[5vw] h-[7vw] z-10 rounded-md"
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
                    className="absolute w-[5vw] h-[7vw] z-10 rounded-md"
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
                    className="absolute w-[5vw] h-[7vw] z-10 rounded-md"
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
                        onClick={() => moveButton()}
                    >
                        Next Hand
                    </Button>
                </div>
            </Card>
        </main>
    );
}
