import { swaggerDocument } from '@common/swagger.loader';

describe('Swagger', () => {
  test('should set host equal to env.SWAGGER_HOST', () => {
    expect(swaggerDocument.host).toBe(process.env.SWAGGER_HOST);
  });
});
