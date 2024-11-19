export type CustomAvatar = {
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