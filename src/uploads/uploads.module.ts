import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToArvanProvider } from './providers/upload-to-arvan.provider';
import { S3ClientProvider } from './providers/s3-client.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadsController],
  providers: [UploadsService, UploadToArvanProvider, S3ClientProvider],
})
export class UploadsModule {}
