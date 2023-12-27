import Joi from 'joi';

const tradeJoi = {
  body: Joi.object({
    symbol: Joi.string().required(),
    operation: Joi.string().valid('buy', 'sell'),
    amount: Joi.number(),
    maxEffectivePrice: Joi.number().optional(),
  }),
};

export default tradeJoi;
