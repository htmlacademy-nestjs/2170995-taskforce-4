import { LoginUserDTO } from './dto/login-user.dto';
import { TaskUserEntity } from './../task-user/task-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TaskUserMemoryRepository } from './../task-user/task-user-memory.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly taskUserRepository: TaskUserMemoryRepository
  ) {}

  public async register(dto: CreateUserDTO) {
    const { name, email, city, password, role, dateOfBirth  } = dto;

    const taskUser = {
      name, email, city, role, avatar: '',
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
}
