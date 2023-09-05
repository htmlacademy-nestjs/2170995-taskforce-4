import { UpdateUserDTO } from './dto/update-user.dto';
import { UserExecutorRdo } from './rdo/user-executor.rdo';
import { UserCustomerRdo } from './rdo/user-customer.rdo';
import { RequestWithTokenPayload, UserRole } from '@project/shared/app-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RequestWithUser } from '@project/shared/app-types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, Param, Get, HttpStatus, HttpCode, UseGuards, Req, Patch } from '@nestjs/common';
import { fillObject } from '@project/util/util-core'
import { UserRdo } from './rdo/user.rdo';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    const { email, role, name } = newUser;
    await this.notifyService.registerSubscriber({ email, role, name })

    if (role === UserRole.Customer) {
      return fillObject(UserCustomerRdo, newUser);
    } else if (role === UserRole.Executor) {
      return fillObject(UserExecutorRdo, newUser);
    }
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    if (existUser.role === UserRole.Customer) {
      return fillObject(UserCustomerRdo, existUser);
    } else if (existUser.role === UserRole.Executor) {
      return fillObject(UserExecutorRdo, existUser);
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'The password has been successfully changed'
  })
  @Patch('changePassword')
  @UseGuards(JwtAuthGuard)
  public async changeUserPassword(id: string, @Body() dto: ChangeUserPasswordDto) {
    const updateUser = await this.authService.changePassword(id, dto);
    return fillObject(UserRdo, updateUser);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The users list has been successfully added.'
  })
  @Post('usersList')
  public async getUsers(@Body() data: {ids: string[]}) {
    const users = await this.authService.getUsers(data.ids);

    return fillObject(UserRdo, users);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated.'
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  public async updateUser(@Param('id', MongoidValidationPipe) id:string, @Body() dto: UpdateUserDTO) {
    const user = await this.authService.updateUser(id, dto);

    if(user.role === UserRole.Customer) {
      return fillObject(UserCustomerRdo, user);
    } else if(user.role === UserRole.Executor) {
      return fillObject(UserExecutorRdo, user);
    }
  }
}
