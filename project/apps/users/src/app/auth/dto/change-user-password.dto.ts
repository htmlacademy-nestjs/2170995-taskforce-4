import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';


export class ChangeUserPasswordDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'stiv@mail.ru',
  })
  @IsEmail({}, {  message: AUTH_USER_EMAIL_NOT_VALID  })
  public email: string;

  @ApiProperty({
    description: 'Current user password',
    example: 'qwerty'
  })
  @IsString({ message: 'current password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public currentPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: '123456'
  })
  @IsString({ message: 'new password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public newPassword: string;
}
