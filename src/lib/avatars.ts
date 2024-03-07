export interface CustomAvatar {
  /** Position at the table in [0,9] */
  seatNumber: number,
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
    seatNumber: 0,
    avatarX: 25,
    avatarY: 5,
    buttonX: 30.75,
    buttonY: 13.25
  },
  {
    seatNumber: 1,
    avatarX: 40,
    avatarY: 2.5,
    buttonX: 41.25,
    buttonY: 11.25
  },
  {
    seatNumber: 2,
    avatarX: 55,
    avatarY: 2.5,
    buttonX: 56.25,
    buttonY: 11.25
  },
  {
    seatNumber: 3,
    avatarX: 70,
    avatarY: 5,
    buttonX: 66.75,
    buttonY: 13.25
  },
  {
    seatNumber: 4,
    avatarX: 77.5,
    avatarY: 20,
    buttonX: 71.25,
    buttonY: 21.25
  },
  {
    seatNumber: 5,
    avatarX: 70,
    avatarY: 35,
    buttonX: 66.75,
    buttonY: 29.25
  },
  {
    seatNumber: 6,
    avatarX: 55,
    avatarY: 37.5,
    buttonX: 56.25,
    buttonY: 31.25
  },
  {
    seatNumber: 7,
    avatarX: 40,
    avatarY: 37.5,
    buttonX: 41.25,
    buttonY: 31.25
  },
  {
    seatNumber: 8,
    avatarX: 25,
    avatarY: 35,
    buttonX: 30.75,
    buttonY: 29.25
  },
  {
    seatNumber: 9,
    avatarX: 17.5,
    avatarY: 20,
    buttonX: 26.25,
    buttonY: 21.25
  }
];

export default Avatars;