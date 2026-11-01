import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadToArvanProvider } from './upload-to-arvan.provider';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFileInterface } from '../interfaces/upload-file.interface';
import { ConfigService } from '@nestjs/config';
import { FileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Inject UploadToArvanProvider
     */
    private readonly uploadToArvanProvider: UploadToArvanProvider,

    /**
     * Inject UploadsRepository
     */
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,

    /**
     * Inject ConfigService
     */
    private readonly configService: ConfigService,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    //Throw Error When The File Does Not Exist
    if (!file) {
      throw new BadRequestException('File is required');
    }

    //Throw Error When File Size Is Bigger Than 5Mb
    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      throw new BadRequestException('File is too large (max 5 MB)');
    }

    //Throw Error For Unsupported MIME Types
    const isSupportedMimeType = [
      'image/gif',
      'image/jpeg',
      'image/png',
    ].includes(file.mimetype);

    if (!isSupportedMimeType) {
      throw new BadRequestException('Mime Type Not Supported');
    }

    try {
      //Upload File To The Arvan S3 Bucket
      const name = await this.uploadToArvanProvider.fileUpload(file);

      //Generate To A New Entry In Database
      const bucket = this.configService.getOrThrow<string>(
        'appConfig.arvanBucket',
      );
      const endpoint = this.configService.getOrThrow<string>(
        'appConfig.arvanEndpoint',
      );
      const host = new URL(endpoint).host;

      const uploadFile: UploadFileInterface = {
        name,
        path: `https://${bucket}.${host}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadsRepository.create(uploadFile);

      return await this.uploadsRepository.save(upload);
    } catch (err) {
      throw new ConflictException(err);
    }
  }
}
