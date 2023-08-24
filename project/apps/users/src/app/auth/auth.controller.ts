import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RequestWithUser } from '@project/shared/app-types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, Param, Get, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { fillObject } from '@project/util/util-core'
import { UserRdo } from './rdo/user.rdo';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name })
    return fillObject(UserRdo, newUser);
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
    return fillObject(UserRdo, existUser);
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
}
