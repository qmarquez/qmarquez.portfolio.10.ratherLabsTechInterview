import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';

import logger from '@common/logger.loader';
import swaggerRouter from '@common/swagger.loader';
import orderbookTipsHandler from '@handlers/orderbookTips.handler';
import tradeHandler from '@handlers/trade.handler';

import errorMiddleware from './middlewares/error.middleware';
import validateRequest from './middlewares/validate.middleware';
import orderbookTipsJoi from './schemas/orderbookTips.joi';
import tradeJoi from './schemas/trade.joi';

const app = express();

app.use('/api-docs', swaggerRouter);

app.use(bodyParser.json());
app.get(
  '/orderbook-tips',
  validateRequest(orderbookTipsJoi),
  orderbookTipsHandler,
);
app.post('/trade', validateRequest(tradeJoi), tradeHandler);

const server = app.listen(process.env.PORT, () => {
  logger.info(`server ready at ${process.env.PORT}`);
  server.emit('ready');
});

app.use(errorMiddleware);

export default server;
