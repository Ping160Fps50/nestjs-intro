import {
  BadGatewayException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { basename, extname } from 'path';
import { S3_CLIENT } from './s3-client.provider';

@Injectable()
export class UploadToArvanProvider {
  private readonly logger = new Logger(UploadToArvanProvider.name);

  constructor(
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    private readonly configService: ConfigService,
  ) {}

  public async fileUpload(file: Express.Multer.File) {
    const bucket = this.configService.getOrThrow<string>(
      'appConfig.arvanBucket',
    );
    const fileName = this.generateFileName(file);

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch (err) {
      this.logger.error('Arvan upload failed', err);
      throw new BadGatewayException('Could not upload the file');
    }

    return fileName;
  }

  private generateFileName(file: Express.Multer.File) {
    const extension = extname(file.originalname).toLowerCase();

    const name = basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .slice(0, 50);

    return `${name || 'file'}-${randomUUID()}${extension}`;
  }
}
