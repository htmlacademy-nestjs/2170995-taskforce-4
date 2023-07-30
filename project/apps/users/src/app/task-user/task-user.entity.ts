import { SALT_ROUND } from './task-user.constant';
import { genSalt, hash, compare } from 'bcrypt';
import { User, City, UserRole } from '@project/shared/app-types';

export class TaskUserEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public city: City;
  public passwordHash: string;
  public role: UserRole;
  public avatar?: string;
  public dateOfBirth: Date;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      city: this.city,
      passwordHash: this.passwordHash,
      role: this.role,
      avatar: this.avatar,
      dateOfBirth: this.dateOfBirth,
    }
  }

  public fillEntity(taskUser: User) {
    this._id = taskUser._id;
    this.name = taskUser.name;
    this.email = taskUser.email;
    this.city = taskUser.city;
    this.passwordHash = taskUser.passwordHash;
    this.role = taskUser.role;
    this.avatar = taskUser.avatar;
    this.dateOfBirth = taskUser.dateOfBirth;
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUND);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
