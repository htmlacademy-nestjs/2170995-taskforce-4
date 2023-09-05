import { UserRole } from '@project/shared/app-types';
export class CreateSubscriberDto {
  public email: string;
  public name: string;
  public role: UserRole;
}
