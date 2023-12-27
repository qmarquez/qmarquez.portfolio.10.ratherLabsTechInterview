import { getBookFromBitfinex } from '@services/bitfinex.service';
import { Request, Response } from 'express';

import responseBuilder from '@common/responseBuilder';

async function orderbookTipsHandler(req: Request, res: Response) {
  const { symbol } = req.query as { symbol: string };
  const [, orderbookTips] = await getBookFromBitfinex(symbol);
  res.status(200).json(responseBuilder({ orderbookTips }));
}

export default orderbookTipsHandler;
