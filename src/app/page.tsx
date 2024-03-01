import { Button, ButtonGroup, Card } from "@nextui-org/react";
import { FaArrowRightLong, FaArrowRotateLeft, FaTrash } from "react-icons/fa6";

import table from '../../public/img/table.png';

export default function Home() {
  return (
    <main>
      <div className="relative h-[100vh]">
        <img src={table.src} className="w-[50vw] pt-[18vh] ml-auto mr-auto" />
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
