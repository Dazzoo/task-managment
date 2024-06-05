import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_ENV: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  PORT: Joi.string().default(3000).when('APP_ENV', {
    is: 'dev',
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
