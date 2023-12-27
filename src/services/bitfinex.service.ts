import websockets from 'ws';

import { BadRequest } from '../errors/errors';
import Book from '../lib/book.type';

export const getBookFromBitfinex = (symbol: string) =>
  new Promise<Book>((res, rej) => {
    const bitfinexSocket = new websockets('wss://api-pub.bitfinex.com/ws/2');

    bitfinexSocket.on('open', () =>
      bitfinexSocket.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol,
        }),
      ),
    );

    bitfinexSocket.on('message', (msg: any) => {
      const parsedMessage = JSON.parse(msg);

      if (parsedMessage.msg == 'symbol: invalid') {
        rej(BadRequest('Invalid symbol'));
      }

      if (Array.isArray(parsedMessage)) {
        bitfinexSocket.close();
        res(parsedMessage as Book);
      }
    });
  });
