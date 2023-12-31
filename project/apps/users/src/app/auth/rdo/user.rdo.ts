import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
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
  public city: City;

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

  @ApiProperty({
    description: 'Date the task was created',
    example: '2023-08-18'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Task update date',
    example: '2023-09-18'
  })
  @Expose()
  public updatedAt: Date;
}
