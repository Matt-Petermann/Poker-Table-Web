export interface CustomAvatar {
  /** Percent distance of the viewport width for the avatar from the left. */
  avatarX: number,
  /** Percent distance of the viewport width for the avatar from the top. */
  avatarY: number,
  /** Percent distance of the viewport width for the button from the left. */
  buttonX: number,
  /** Percent distance of the viewport width for the button from the top. */
  buttonY: number
}

const Avatars: CustomAvatar[] = [
  {
    avatarX: 25,
    avatarY: 5,
    buttonX: 30.75,
    buttonY: 13.25
  },
  {
    avatarX: 40,
    avatarY: 2.5,
    buttonX: 41.25,
    buttonY: 11.25
  },
  {
    avatarX: 55,
    avatarY: 2.5,
    buttonX: 56.25,
    buttonY: 11.25
  },
  {
    avatarX: 70,
    avatarY: 5,
    buttonX: 66.75,
    buttonY: 13.25
  },
  {
    avatarX: 77.5,
    avatarY: 20,
    buttonX: 71.25,
    buttonY: 21.25
  },
  {
    avatarX: 70,
    avatarY: 35,
    buttonX: 66.75,
    buttonY: 29.25
  },
  {
    avatarX: 55,
    avatarY: 37.5,
    buttonX: 56.25,
    buttonY: 31.25
  },
  {
    avatarX: 40,
    avatarY: 37.5,
    buttonX: 41.25,
    buttonY: 31.25
  },
  {
    avatarX: 25,
    avatarY: 35,
    buttonX: 30.75,
    buttonY: 29.25
  },
  {
    avatarX: 17.5,
    avatarY: 20,
    buttonX: 26.25,
    buttonY: 21.25
  }
];

export default Avatars;