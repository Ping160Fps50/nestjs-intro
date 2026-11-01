import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'test', 'production', 'staging')
    .default('development'),
  DATABASE_PORT: joi.number().port().default(5432),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_HOST: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  DATABASE_USER: joi.string().required(),
  PROFILE_API_KEY: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_TOKEN_AUDIENCE: joi.string().default('localhost:3000'),
  JWT_TOKEN_ISSUER: joi.string().default('localhost:3000'),
  JWT_ACCESS_TOKEN_TTL: joi.number().default(3600),
  JWT_REFRESH_TOKEN_TTL: joi.number().default(86400),
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  API_VERSION: joi.string().required(),
  ARVAN_ENDPOINT: joi.string().required(),
  ARVAN_REGION: joi.string().required(),
  ARVAN_ACCESS_KEY: joi.string().required(),
  ARVAN_SECRET_KEY: joi.string().required(),
  ARVAN_BUCKET: joi.string().required(),
  MAIL_HOST: joi.string().required(),
  SMTP_USERNAME: joi.string().required(),
  SMTP_PASSWORD: joi.string().required(),
});
