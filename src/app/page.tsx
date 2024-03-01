'use client'

import { Button, ButtonGroup, Card } from "@nextui-org/react";
import { FaArrowRightLong, FaArrowRotateLeft, FaTrash, FaUserShield } from "react-icons/fa6";

import table from '../../public/img/table.png';
import PlayerAvatar from "./components/playerAvatar";

export default function Home() {
  return (
    <main>
      <Button className="fixed top-2 right-2 z-10" endContent={<FaUserShield />} onClick={() => window.location.href = '/admin'}>
        Admin Portal
      </Button>
      <div className="relative h-[100vh]">
        <img src={table.src} className="w-[50vw] pt-[18vh] ml-auto mr-auto" />
        <PlayerAvatar avatarY={13}  avatarX={23}  buttonY={25}  buttonX={30} />
        <PlayerAvatar avatarY={5}   avatarX={38}  buttonY={20}  buttonX={40} />
        <PlayerAvatar avatarY={5}   avatarX={-38} buttonY={20}  buttonX={-42} />
        <PlayerAvatar avatarY={13}  avatarX={-23} buttonY={25}  buttonX={-32} />
        <PlayerAvatar avatarY={40}  avatarX={-17} buttonY={40}  buttonX={-30} />
        <PlayerAvatar avatarY={-26} avatarX={-23} buttonY={-45} buttonX={-32} />
        <PlayerAvatar avatarY={-20} avatarX={-38} buttonY={-40} buttonX={-42} />
        <PlayerAvatar avatarY={-20} avatarX={38}  buttonY={-40} buttonX={40} />
        <PlayerAvatar avatarY={-26} avatarX={23}  buttonY={-45} buttonX={30} />
        <PlayerAvatar avatarY={40}  avatarX={17}  buttonY={40}  buttonX={27} />
      </div>
      <Card isBlurred className="fixed border-none left-12 right-12 bottom-4">
        <div>
          <ButtonGroup size="lg" radius="full" className="m-6 font-bold">
            <Button variant="ghost" color="warning" startContent={<FaArrowRotateLeft />}>
              Undo Last Card
            </Button>
            <Button variant="ghost" color="danger" endContent={<FaTrash />}>
              Reset Hand
            </Button>
          </ButtonGroup>
          <Button variant="ghost" color="success" size="lg" radius="full" className="float-right m-6 font-bold" endContent={<FaArrowRightLong />}>
            Next Hand
          </Button>
        </div>
      </Card>
    </main>
  );
}
