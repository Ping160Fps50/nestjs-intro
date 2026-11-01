import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Inject usersReposiory
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneUserByEmail(email: string) {
    let user: User | undefined | null = undefined;
    try {
      //Find User By Email
      user = await this.usersRepository.findOneBy({ email });
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: 'Error Connecting To The Database',
      });
    }

    //If User Does Not Exists, Throw An Error
    if (!user) {
      throw new UnauthorizedException('No Such A User Found With This Email');
    }

    return user;
  }
}
