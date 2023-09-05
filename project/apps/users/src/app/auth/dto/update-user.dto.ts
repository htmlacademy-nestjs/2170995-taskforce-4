import { AUTH_USER_MAX_NUMBER_SPECIALIZATION, AUTH_USER_MAX_NUMBER_SPECIALIZATION_NOT_VALID } from './../auth.constant';
import { ApiProperty } from '@nestjs/swagger/dist';
import { City } from '@project/shared/app-types';
import { Transform } from 'class-transformer';
import { IsString, IsEnum, Length, MaxDate, IsOptional, MaxLength, IsArray, ArrayMaxSize } from 'class-validator';
import dayjs from 'dayjs';
import { AUTH_USER_CITY_NOT_VALID, AUTH_MIN_USER_AGE, AUTH_USER_NOT_VALID_MIN_AGE } from '../auth.constant';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'User full name',
    example: 'Ivleev Stiv',
  })
  @IsString({ message: 'name is required' })
  @Length(3, 50, { message: 'Min length is 3, max is 50' })
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1991-01-01',
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(dayjs(new Date()).subtract(AUTH_MIN_USER_AGE, 'year').toDate(), {message: AUTH_USER_NOT_VALID_MIN_AGE})
  @IsOptional()
  public dateOfBirth?: Date;

  @ApiProperty({
    description: 'Information about yourself.',
    example: 'I do my tasks well'
  })
  @MaxLength(300, { message: 'Max length is 300 symbols' })
  @IsOptional()
  public personalInfo?: string;

  @ApiProperty({
    description: 'List of user skills',
    example: 'I forget everything'
  })
  @IsArray()
  @ArrayMaxSize(AUTH_USER_MAX_NUMBER_SPECIALIZATION, { message: AUTH_USER_MAX_NUMBER_SPECIALIZATION_NOT_VALID})
  @IsOptional()
  public specialization?: string[];

  @ApiProperty({
    description: 'One city from the list',
    example: 'Москва'
  })
  @IsEnum(City, { message: AUTH_USER_CITY_NOT_VALID })
  @IsOptional()
  public city?: City;
}
