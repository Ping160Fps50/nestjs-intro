import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Body,
  Headers,
  Ip,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from '../auth/guards/access-token/access-token.guard';
import { Auth } from '../auth/decorator/auth.decorator';
import { AuthType } from '../auth/enum/auth-type.enum';

// http://localhost/users

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('{/:id}')
  @ApiOperation({
    summary: 'Fetches  List Of Registered Users On The Application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users Fetched Successfully Based On The Query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The Number Of Entries Returned Per Query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The Position Of The Page Number That You Want The Api To Return',
    example: 1,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Get('/:id')
  public findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }

  @Post()
  @Auth([AuthType.None])
  @UseInterceptors(ClassSerializerInterceptor)
  public createUsers(
    @Body() createUserDto: CreateUserDto,
    // @Headers() headers: any,
    // @Ip() ip: any,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Post('create-many')
  // @SetMetadata('authType', 'none')
  // @Auth([AuthType.Bearer])
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createManyUsers(createManyUsersDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'Patch Req Successfull';
  }
}
