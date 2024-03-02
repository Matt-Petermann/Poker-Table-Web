'use client'

import { Button, ButtonGroup, Card } from "@nextui-org/react";
import { FaArrowRightLong, FaArrowRotateLeft, FaTrash, FaUserShield } from "react-icons/fa6";

import PlayerAvatar from "@/app/components/playerAvatar";
import Avatars from "@/lib/avatars";

import table from '@/public/img/table.png';

export default function Home() {
  return (
    <main>
      <Button className="fixed top-2 right-2 z-10" endContent={<FaUserShield />} onClick={() => window.location.href = '/admin'}>
        Admin Portal
      </Button>
      <div className="relative h-[100vh] pt-[10vw]">
        <img src={table.src} className="w-[50vw] h-[25vw] ml-auto mr-auto" />
        { Avatars.map((avatar) => <PlayerAvatar avatar={avatar} />) }
      </div>
      <Card isBlurred className="fixed border-none left-12 right-12 bottom-4">
        <div>
          <ButtonGroup size="lg" radius="full" className="m-6">
            <Button variant="ghost" color="warning" className="font-bold" startContent={<FaArrowRotateLeft />}>
              Undo Last Card
            </Button>
            <Button variant="ghost" color="danger" className="font-bold" endContent={<FaTrash />}>
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
