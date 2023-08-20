import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDTO } from './dto/login-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, Param, Get, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { fillObject } from '@project/util/util-core'
import { UserRdo } from './rdo/user.rdo';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

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
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser);
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
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
}
