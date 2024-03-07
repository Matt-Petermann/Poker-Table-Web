import { useState } from "react";
import { Avatar, Popover, PopoverTrigger, PopoverContent, Listbox, ListboxItem } from "@nextui-org/react";

import { CustomAvatar } from "@/lib/avatars";
import { FaCircleRight, FaRegClock } from "react-icons/fa6";

interface PlayerAvatar {
  /** Custom avatar properties for table arrangement. */
  avatar: CustomAvatar
}

export default function PlayerAvatar({ avatar }: PlayerAvatar) {
  const { avatarX, avatarY } = avatar;
  
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Move button to this seat.
   */
  const moveButton = () => {
    setIsOpen(false);
  }

  /**
   * Flag this player as sitting out.
   */
  const sitPlayerOut = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Popover showArrow size="lg" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <Avatar
            className="hover:cursor-pointer absolute w-[5vw] h-[5vw]"
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
              className="text-xl"
              onClick={sitPlayerOut}>
                <p className="text-xl">Sit player out</p>
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>
    </>    
  )
}