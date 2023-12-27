import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';

import logger from '@common/logger.loader';
import swaggerRouter from '@common/swagger.loader';

import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use('/api-docs', swaggerRouter);

app.use(bodyParser.json());
const server = app.listen(process.env.PORT, () => {
  logger.info(`server ready at ${process.env.PORT}`);
  server.emit('ready');
});

app.use(errorMiddleware);

export default server;
