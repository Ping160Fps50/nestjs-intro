import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingService } from './hashing.service';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * injecting userService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject hashingProvider
     */
    private readonly hashingProvider: HashingService,

    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    //Find User By Email
    const user = await this.usersService.findOneByEmail(signInDto.email);

    //Compare Password With Hash
    let isEqual: Boolean = false;

    //If Password Does Not Exist
    if (!user.password) {
      throw new UnauthorizedException(
        'No Password Set On This Account, Pls Set Password For This Account',
      );
    }

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: 'Could Not Compare Passwords',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect Password');
    }

    //Create Jwt Access Token
    return await this.generateTokensProvider.generateTokens(user);
  }
}
