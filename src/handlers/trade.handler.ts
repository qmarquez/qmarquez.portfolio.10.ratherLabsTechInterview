import { getBookFromBitfinex } from '@services/bitfinex.service';
import { Request, Response } from 'express';

import responseBuilder from '@common/responseBuilder';

import { BookEntry } from '../lib/book.type';
import Operation from '../lib/operation.type';

const strategies = {
  buy: {
    filter: ([, , amount]: BookEntry) => amount > 0,
    sort: ([pricea]: BookEntry, [priceb]: BookEntry) => pricea - priceb,
  },
  sell: {
    filter: ([, , amount]: BookEntry) => amount < 0,
    sort: ([pricea]: BookEntry, [priceb]: BookEntry) => priceb - pricea,
  },
};

async function tradeHandler(req: Request, res: Response) {
  const { symbol, operation, amount, maxEffectivePrice } = req.body as {
    symbol: string;
    operation: Operation;
    amount: number;
    maxEffectivePrice?: number;
  };
  const [, openOperations] = await getBookFromBitfinex(symbol);
  const { filter, sort } = strategies[operation];

  let effectivePrice = 0;
  let amountToComplete = amount;
  let orderCompleted = 1;
  const operationsForMatketDetph = openOperations.filter(filter).sort(sort);

  for (const [price, , openAmount] of operationsForMatketDetph) {
    let amountToUse: number;
    let preEffectivePrice = effectivePrice;
    let preAmountToComplete = amountToComplete;
    const absOpenAmount = Math.abs(openAmount);

    if (absOpenAmount < amountToComplete) {
      amountToUse = absOpenAmount;
      preAmountToComplete -= absOpenAmount;
    } else {
      amountToUse = amountToComplete;
      preAmountToComplete = 0;
    }

    preEffectivePrice += price * amountToUse;

    if (maxEffectivePrice && preEffectivePrice >= maxEffectivePrice) {
      orderCompleted = (amount - amountToComplete) / amount;
      break;
    }
    effectivePrice = preEffectivePrice;
    amountToComplete = preAmountToComplete;
    if (!amountToComplete) {
      break;
    }
  }

  const response = { effectivePrice, orderCompleted };

  res.status(200).json(responseBuilder(response));
}

export default tradeHandler;
