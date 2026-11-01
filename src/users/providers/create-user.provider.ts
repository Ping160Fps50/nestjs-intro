import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from '../../auth/providers/hashing.service';
import { MailService } from '../../mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Inject hashingService
     */
    @Inject(forwardRef(() => HashingService))
    private readonly hashingService: HashingService,

    /**
     * Inject MailService
     */
    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      //check user exists with same email
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable To Process Your Request At The Moment Please Try Again.',
        {
          description: 'Error Connecting To The Database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'The User Already Exists, Pls Check Your Email.',
      );
    }

    if (!createUserDto.password) {
      throw new BadRequestException('No Password Founded');
    }

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingService.hashPassword(createUserDto.password),
    });
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable To Save New User To The Database.',
        {
          description: 'Error Connecting To The Database',
        },
      );
    }

    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (err) {
      throw new RequestTimeoutException(err);
    }

    return newUser;
  }
}
