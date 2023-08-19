import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique address',
    example: 'stiv@mail.ru',
  })
  @IsEmail({}, {  message: AUTH_USER_EMAIL_NOT_VALID  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  @IsString()
  public password: string;
}
