import { Avatar } from "@nextui-org/react";

interface PlayerAvatar {
  /** Percent distance for the avatar from the top if positive, or from the bottom if negative. */
  avatarY: number;
  /** Percent distance for the avatar from the left if positive, or from the right if negative. */
  avatarX: number,
  /** Percent distance for the button from the top if positive, or from the bottom if negative. */
  buttonY: number;
  /** Percent distance for the button from the left if positive, or from the right if negative. */
  buttonX: number
}

export default function PlayerAvatar({avatarY, avatarX, buttonY, buttonX}: PlayerAvatar) {
  return (
    <>
      <Avatar className={`absolute w-[5vw] h-[5vw] ${avatarY > 0 ? 'top' : 'bottom'}-[${Math.abs(avatarY)}vh] ${avatarX > 0 ? 'left' : 'right'}-[${Math.abs(avatarX)}vw]`} />
      <Avatar size="sm" name="BTN"
        style={{
          backgroundColor: 'white',
          color: 'black',
          position: 'absolute',
          top: `${buttonY > 0 ? buttonY : (100 + buttonY)}vh`,
          left: `${buttonX > 0 ? buttonX : (100 + buttonX)}vw`
        }} />
    </>    
  )
}