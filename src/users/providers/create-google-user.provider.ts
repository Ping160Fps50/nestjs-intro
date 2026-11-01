import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { GoogleUserInterface } from '../interface/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    /**
     * Inject userRepository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createGoggleUser(googleUser: GoogleUserInterface) {
    try {
      const newUser = this.userRepository.create(googleUser);
      return await this.userRepository.save(newUser);
    } catch (err) {
      throw new ConflictException(err, {
        description: 'Could Not Create A New User',
      });
    }
  }
}
