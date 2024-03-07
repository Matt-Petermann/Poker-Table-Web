'use client'

import { Avatar, Button, ButtonGroup, Card } from "@nextui-org/react";
import { FaArrowRightLong, FaArrowRotateLeft, FaTrash, FaUserShield } from "react-icons/fa6";

import PlayerAvatar from "@/app/components/playerAvatar";
import avatars from "@/lib/avatars";
import { useTableContext } from "./contexts/tableContext";

import table from '@/public/img/table.png';

export default function Home() {
  const { buttonPosition, setButtonPosition } = useTableContext();

  /**
   * Update button location.
   */
  const moveButton = () => {
    setButtonPosition(buttonPosition + 1);
  }
  
  return (
    <main>
      <Button className="fixed top-2 right-2 z-10" endContent={<FaUserShield />} onClick={() => window.location.href = '/admin'}>
        Admin Portal
      </Button>
      <div className="relative h-[100vh] pt-[10vw]">
        <img src={table.src} className="w-[50vw] h-[25vw] ml-auto mr-auto" />
        { avatars.map((avatar) => <PlayerAvatar avatar={avatar} />) }
        <Avatar name="BTN"
          style={{
            position: 'absolute',
            width: '2.5vw',
            height: '2.5vw',
            backgroundColor: 'white',
            color: 'black',
            left: `${avatars[buttonPosition].buttonX}vw`,
            top: `${avatars[buttonPosition].buttonY}vw`,
            transition: 'all .25s ease-out'
          }} />
      </div>
      <Card isBlurred className="fixed left-12 right-12 bottom-4">
        <div>
          <ButtonGroup size="lg" radius="full" className="m-6">
            <Button variant="ghost" color="warning" className="font-bold" startContent={<FaArrowRotateLeft />}>
              Undo Last Card
            </Button>
            <Button variant="ghost" color="danger" className="font-bold" endContent={<FaTrash />}>
              Reset Hand
            </Button>
          </ButtonGroup>
          <Button className="float-right m-6 font-bold"
            variant="ghost"
            color="success"
            size="lg"
            radius="full"
            endContent={<FaArrowRightLong />}
            onClick={() => moveButton()}>
              Next Hand
          </Button>
        </div>
      </Card>
    </main>
  );
}
