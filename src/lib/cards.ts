const parseFileName = (card: string) => card.match(/^([^\/]*\/[^\/]*\/[^\/]*\/[^\/]*\/)([^.]+)/)?.[2];

const cardImages = require.context("@/public/img/cards");
const cardImagesList = cardImages
    .keys()
    .map(cardImage => cardImages(cardImage).default)
    .sort((a, b) => Number(parseFileName(a.src)) - Number(parseFileName(b.src)));

export default cardImagesList;