import { Avatar } from "@nextui-org/react";

import { CustomAvatar } from "@/lib/avatars";

interface PlayerAvatar {
  /** Custom avatar properties for table arrangement. */
  avatar: CustomAvatar
}

export default function PlayerAvatar({ avatar }: PlayerAvatar) {
  const { avatarX, avatarY } = avatar;

  return (
    <>
      <Avatar
        style={{
          position: 'absolute',
          width: '5vw',
          height: '5vw',
          left: `${avatarX}vw`,
          top: `${avatarY}vw`
        }}
      />
    </>    
  )
}