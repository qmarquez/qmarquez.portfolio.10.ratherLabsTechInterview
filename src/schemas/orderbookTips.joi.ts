import Joi from 'joi';

const orderbookTipsJoi = {
  query: Joi.object({
    symbol: Joi.string().required(),
  }),
};

export default orderbookTipsJoi;
