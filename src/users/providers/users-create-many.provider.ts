import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject DataSource
     */
    private readonly dataSource: DataSource,
  ) {}

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    //Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      //Connect Query Runner To Datasource
      await queryRunner.connect();
      //Start Transaction
      await queryRunner.startTransaction();
    } catch (err) {
      throw new RequestTimeoutException('Could Not Connect To The Database');
    }

    try {
      for (let user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      //If Successfull Commit
      await queryRunner.commitTransaction();
    } catch (err) {
      //If Unsuccessfull Rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could Not Complete The Transaction', {
        description: String(err),
      });
    } finally {
      try {
        //Release Connection
        await queryRunner.release();
      } catch (err) {
        throw new RequestTimeoutException('Could Not Release The Connection');
      }
    }
    return { users: newUsers };
  }
}
