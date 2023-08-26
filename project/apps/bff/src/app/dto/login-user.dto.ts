import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@mail.ru'
  })
  @IsEmail({})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  @IsString()
  public password: string;
}
