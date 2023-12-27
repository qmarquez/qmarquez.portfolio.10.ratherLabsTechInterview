type CHANNEL_ID = number;
type PRICE = number;
type COUNT = number;
type AMOUNT = number;
export type BookEntry = [PRICE, COUNT, AMOUNT];

type Book = [CHANNEL_ID, Array<BookEntry>];

export default Book;
