import { Reflector } from '@nestjs/core';
import { AuthType } from '../enum/auth-type.enum';

export const Auth = Reflector.createDecorator<AuthType[]>();
