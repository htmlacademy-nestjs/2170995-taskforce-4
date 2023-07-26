import { UserRole } from './user-role.enum';
import { UserCity } from './user-city.enum';

export interface User {
  _id?: string;
  name: string;
  email: string;
  city: UserCity;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  dateOfBirth: Date;
}
