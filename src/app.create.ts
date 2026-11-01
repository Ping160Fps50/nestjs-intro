import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

export function appCreate(app: INestApplication): void {
  /**
   * Use Validation Pipes Globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * Swagger Configuration
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Learning Nest Js - Blog App API')
    .setDescription('Set Base API URL As http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-off-service')
    .setLicense('MIT License', '')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //Setup Arvan S3 Bucket
  // const configService = app.get(ConfigService);

  // const client = new S3Client({
  //   endpoint: configService.getOrThrow<string>('appConfig.arvanEndpoint'),
  //   region: configService.getOrThrow<string>('appConfig.arvanRegion'),
  //   credentials: {
  //     accessKeyId: configService.getOrThrow<string>('appConfig.arvanAccessKey'),
  //     secretAccessKey: configService.getOrThrow<string>(
  //       'appConfig.arvanSecretKey',
  //     ),
  //   },
  // });

  //Enable Cors
  app.enableCors();
}
