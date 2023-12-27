const processEnvBackup = process.env;
beforeAll(() => {
  process.env = {
    NODE_ENV: 'production',
  };
});

import logger from '@common/logger.loader';

describe('Logger', () => {
  test('should not logger to console if process.NODE_ENV == production', () => {
    const loggerAddSpy = jest.spyOn(logger, 'add');

    expect(loggerAddSpy).not.toHaveBeenCalled();
  });
});

afterAll(() => {
  process.env = processEnvBackup;
});
