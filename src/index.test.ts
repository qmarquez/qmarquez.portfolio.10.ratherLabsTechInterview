jest.mock('dotenv/config', () => {
  process.env = {
    PORT: '1234',
  };
});

import request from 'supertest';

import logger from '@common/logger.loader';

import server from '.';

describe('app', () => {
  test('app should exist and bootstrap', (done) => {
    const loggerInfoSpy = jest
      .spyOn(logger, 'info')
      .mockImplementationOnce(jest.fn());

    expect(server).toBeTruthy();
    server.on('ready', () => {
      expect(loggerInfoSpy).toHaveBeenCalledWith('server ready at 1234');
      done();
    });
  });

  test('/api-docs route should exists', (done) => {
    request(server).get('/api-docs/').expect(200).end(done);
  });

  test('/orderbook-tips route should exists and throw 400 without query', (done) => {
    request(server).get('/orderbook-tips').expect(400).end(done);
  });

  afterAll(() => {
    server.close();
  });
});
