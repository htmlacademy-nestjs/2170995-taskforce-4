import { ApiProperty } from '@nestjs/swagger/dist';
import { City, UserRole } from '@project/shared/app-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsEnum, Length, MaxDate, MaxLength, IsArray, ArrayMaxSize } from 'class-validator';
import dayjs from 'dayjs';
import { AUTH_USER_EMAIL_NOT_VALID, AUTH_USER_CITY_NOT_VALID, AUTH_USER_ROLE_NOT_VALID, AUTH_MIN_USER_AGE, AUTH_USER_NOT_VALID_MIN_AGE } from '../auth.constant';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User full name',
    example: 'Ivleev Stiv',
  })
  @IsString({ message: 'name is required' })
  @Length(3, 50, { message: 'Min length is 3, max is 50' })
  public name: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'stiv@mail.ru',
  })
  @IsEmail({}, {  message: AUTH_USER_EMAIL_NOT_VALID  })
  public email: string;

  @ApiProperty({
    description: 'One city from the list',
    example: 'Москва'
  })
  @IsEnum(City, { message: AUTH_USER_CITY_NOT_VALID })
  public city: City;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public password: string;

  @ApiProperty({
    description: 'Customer or executor',
    example: 'executor'
  })
  @IsEnum(UserRole, { message: AUTH_USER_ROLE_NOT_VALID })
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar path',
    example: 'https://images/avatarka.jpeg'
  })
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1991-01-01',
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(dayjs(new Date()).subtract(AUTH_MIN_USER_AGE, 'year').toDate(), {message: AUTH_USER_NOT_VALID_MIN_AGE})
  public dateOfBirth: Date;

  @ApiProperty({
    description: 'Information about yourself',
    example: 'Плачу во время',
  })
  @MaxLength(300, { message: 'Max length is 300 symbols' })
  public personalInfo?: string;

  @ApiProperty({
    description: 'Specializations of the executor',
    example: 'The Bricklayer'
  })
  @IsArray()
  @ArrayMaxSize(5)
  public specialization?: string[]
}
