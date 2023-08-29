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
  public publishedTasks?: number;
  public newTasksStatus?: number;
  public personalInfo?: string;
  public createdAt?: Date;
  public age?: number;
  public rating?: number;
  public completedTasks?: number;
  public filedTasks?: number;
  public specialization?: string[];
  public placeInRating?: number;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return { ...this };
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

    this.publishedTasks = taskUser.publishedTasks;
    this.newTasksStatus = taskUser.newTasksStatus;
    this.personalInfo = taskUser.personalInfo;
    this.createdAt = taskUser.createdAt;
    this.age = taskUser.age;
    this.rating = taskUser.rating;
    this.completedTasks = taskUser.completedTasks;
    this.filedTasks = taskUser.filedTasks;
    this.specialization = taskUser.specialization;
    this.placeInRating = taskUser.placeInRating;
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
