import { UserRole } from './user-role.enum';
import { City } from './city.enum';
import { UserCustomer } from './user-customer.interface';
import { UserExecutor } from './user-executor.interface';

export interface User extends UserCustomer, UserExecutor {
  _id?: string;
  name: string;
  email: string;
  city: City;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  dateOfBirth: Date;
}
