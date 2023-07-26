import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserCity, UserRole } from '@project/shared/app-types';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Ivleev Stiv'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'stiv@mail.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'One city from the list',
    example: 'Москва'
  })
  @Expose()
  public city: UserCity;

  @ApiProperty({
    description: 'Customer or executor',
    example: 'executor'
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar path',
    example: 'https://images/avatarka.jpeg'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1991-01-01',
  })
  @Expose()
  public dateOfBirth: string;
}
