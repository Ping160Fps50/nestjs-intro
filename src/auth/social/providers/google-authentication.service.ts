import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from '../../config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from '../../../users/providers/users.service';
import { GenerateTokensProvider } from '../../providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      //Verify The Google Token Send By User
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      //If Payload Does Not Exist
      const payload = loginTicket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }

      //Extract The Payload From Goolge Jwt
      const { sub: googleId, email, given_name, family_name } = payload;

      //If No Value For FirstName Or LastName
      const firstName = given_name ?? '';
      const lastName = family_name ?? '';

      //If Google Account Does Not Have Email Address
      if (!email) {
        throw new UnauthorizedException('Google account has no email');
      }

      //Find User In Database with GoogleId
      const user = await this.usersService.findOneUserByGoogleId(googleId);

      //If GoogleId Exists Generate Token
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      //If Not Create User Then Generate Token
      const newUser = await this.usersService.createGoogleUser({
        googleId,
        email,
        firstName,
        lastName,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (err) {
      //Throw Unauthorized Exeption
      throw new UnauthorizedException(err);
    }
  }
}
