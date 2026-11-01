import { S3Client } from '@aws-sdk/client-s3';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const S3_CLIENT = 'S3_CLIENT';

export const S3ClientProvider: Provider = {
  provide: S3_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    new S3Client({
      endpoint: configService.getOrThrow<string>('appConfig.arvanEndpoint'),
      region: configService.getOrThrow<string>('appConfig.arvanRegion'),
      credentials: {
        accessKeyId: configService.getOrThrow<string>(
          'appConfig.arvanAccessKey',
        ),
        secretAccessKey: configService.getOrThrow<string>(
          'appConfig.arvanSecretKey',
        ),
      },
    }),
};
