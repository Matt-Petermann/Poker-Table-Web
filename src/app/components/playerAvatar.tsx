import { Avatar } from "@nextui-org/react";

interface PlayerAvatar {
  /** Percent distance of the viewport width for the avatar from the top. */
  avatarY: number;
  /** Percent distance of the viewport width for the avatar from the left. */
  avatarX: number,
  /** Percent distance of the viewport width for the button from the top. */
  buttonY: number;
  /** Percent distance of the viewport width for the button from the left. */
  buttonX: number
}

export default function PlayerAvatar({avatarY, avatarX, buttonY, buttonX}: PlayerAvatar) {
  return (
    <>
      <Avatar
        style={{
          position: 'absolute',
          width: '5vw',
          height: '5vw',
          top: `${avatarY}vw`,
          left: `${avatarX}vw`
        }}
      />
      <Avatar name="BTN"
        style={{
          position: 'absolute',
          width: '2.5vw',
          height: '2.5vw',
          backgroundColor: 'white',
          color: 'black',
          top: `${buttonY}vw`,
          left: `${buttonX}vw`
        }} />
    </>    
  )
}