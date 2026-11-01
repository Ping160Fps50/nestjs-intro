import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  arvanBucket: process.env.ARVAN_BUCKET,
  arvanRegion: process.env.ARVAN_REGION,
  arvanEndpoint: process.env.ARVAN_ENDPOINT,
  arvanAccessKey: process.env.ARVAN_ACCESS_KEY,
  arvanSecretKey: process.env.ARVAN_SECRET_KEY,
  mailHost: process.env.MAIL_HOST,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
}));
