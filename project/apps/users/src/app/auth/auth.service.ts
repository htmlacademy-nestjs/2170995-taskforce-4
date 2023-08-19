import { TaskUserRepository } from './../task-user/task-user.repository';
import { LoginUserDTO } from './dto/login-user.dto';
import { TaskUserEntity } from './../task-user/task-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import dayjs from 'dayjs';
import {  TokenPayload, User, UserRole  } from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserDTO) {
    const { name, email, city, password, dateOfBirth  } = dto;

    const taskUser = {
      name, email, city, role: UserRole.Customer, avatar: '',
      dateOfBirth:dayjs(dateOfBirth).toDate(), passwordHash: ''
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
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
