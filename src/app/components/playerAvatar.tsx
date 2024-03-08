import { useState } from "react";
import { Avatar, Popover, PopoverTrigger, PopoverContent, Listbox, ListboxItem } from "@nextui-org/react";
import { FaCircleRight, FaRegClock, FaClock } from "react-icons/fa6";

import { CustomAvatar } from "@/lib/avatars";
import { useTableContext } from "@/app/contexts/tableContext";

interface PlayerAvatar {
  /** Custom avatar properties for table arrangement. */
  avatar: CustomAvatar
}

export default function PlayerAvatar({ avatar }: PlayerAvatar) {
  const { avatarX, avatarY, seatNumber } = avatar;
  
  const [isOpen, setIsOpen] = useState(false);

  const { setButtonPosition, activePlayers } = useTableContext();

  /**
   * Move button to this seat.
   */
  const moveButton = () => {
    setButtonPosition(seatNumber);
    setIsOpen(false);
  }

  /**
   * Flag this player as sitting out.
   */
  const sitPlayerOut = () => {
    activePlayers.splice(activePlayers.indexOf(seatNumber), 1);
    setIsOpen(false);
  }

  /**
   * Set this player to active in the game.
   */
  const returnPlayer = () => {
    activePlayers.push(seatNumber);
    setIsOpen(false);
  }

  return (
    <>
      <Popover showArrow size="lg" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <Avatar
            className={`hover:cursor-pointer absolute w-[5vw] h-[5vw] ${activePlayers.includes(seatNumber) ? 'opacity-100' : 'opacity-15'}`}
            style={{
              left: `${avatarX}vw`,
              top: `${avatarY}vw`
            }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <Listbox>              
            <ListboxItem
              key="move"
              startContent={<FaCircleRight />}
              className="text-xl"
              onClick={moveButton}>
                <p className="text-xl">Move button here</p>
            </ListboxItem>
            <ListboxItem
              key="dropout"
              startContent={<FaRegClock />}
              className={`text-xl ${activePlayers.includes(seatNumber) ? "" : "hidden"}`}
              onClick={sitPlayerOut}>
                <p className="text-xl">Sit player out</p>
            </ListboxItem>
            <ListboxItem
              key="return"
              startContent={<FaClock />}
              className={`text-xl ${activePlayers.includes(seatNumber) ? "hidden" : ""}`}
              onClick={returnPlayer}>
                <p className="text-xl">Return player</p>
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>
    </>    
  )
}