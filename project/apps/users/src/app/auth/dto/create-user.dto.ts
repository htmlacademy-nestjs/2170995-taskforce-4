import { ApiProperty } from '@nestjs/swagger/dist';
import { UserCity, UserRole } from '@project/shared/app-types';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User full name',
    example: 'Ivleev Stiv'
  })
  public name: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'stiv@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'One city from the list',
    example: 'Москва'
  })
  public city: UserCity;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  public password: string;

  @ApiProperty({
    description: 'Customer or executor',
    example: 'executor'
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar path',
    example: 'https://images/avatarka.jpeg'
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1991-01-01',
  })
  public dateOfBirth: Date;
}
