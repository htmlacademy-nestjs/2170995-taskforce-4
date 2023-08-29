import { UpdateUserDTO } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { RefreshTokenService } from './../refresh-token/refresh-token.service';
import { ConfigType } from '@nestjs/config';
import { TaskUserRepository } from './../task-user/task-user.repository';
import { LoginUserDTO } from './dto/login-user.dto';
import { TaskUserEntity } from './../task-user/task-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { Injectable, Inject, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import dayjs from 'dayjs';
import { User } from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly JwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDTO) {
    const { name, email, city, password, dateOfBirth, role, personalInfo  } = dto;

    const taskUser = {
      name, email, city, role, avatar: '',
      dateOfBirth:dayjs(dateOfBirth).toDate(), passwordHash: '', personalInfo
    }

    const existUser = await this.taskUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const UserEntity = await new TaskUserEntity(taskUser).setPassword(password);

    return this.taskUserRepository.create(UserEntity);
  }

  public async verifyUser(dto: LoginUserDTO) {
    const { email, password } = dto;
    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const taskUserEntity = new TaskUserEntity(existUser);
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return taskUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.JwtOptions.refreshTokenSecret,
        expiresIn: this.JwtOptions.refreshTokenExpiresIn
      }),
    }
  }

  public async changePassword(_id: string, dto: ChangeUserPasswordDto) {
    const { email, currentPassword, newPassword } = dto;

    const user = await this.verifyUser({ email: email, password: currentPassword });
    const userEntity = await new TaskUserEntity(user).setPassword(newPassword);

    return this.taskUserRepository.update(user._id, userEntity);
  }

  public async updateUser(id: string, dto: UpdateUserDTO) {
    const existUser = await this.taskUserRepository.findById(id);

    if(!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new TaskUserEntity({ ...existUser, ...dto });
    return await this.taskUserRepository.update(id, userEntity);
  }

  public async getUsers(ids: string[]) {
    return this.taskUserRepository.findAll(ids);
  }
}
