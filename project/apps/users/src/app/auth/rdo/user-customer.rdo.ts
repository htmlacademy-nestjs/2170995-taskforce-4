import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class UserCustomerRdo {
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
    description: 'Date the task was created',
    example: '2023-08-18'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'One city from the list',
    example: 'Москва'
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'User email',
    example: 'stiv@mail.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Number of published tasks',
    example: '12'
  })
  @Expose()
  public publishedTasks: number;

  @ApiProperty({
    description: 'Number of tasks with the "New" status',
    example: '10'
  })
  @Expose()
  public newTasksStatus: number;

  @ApiProperty({
    description: 'Information about yourself.',
    example: 'I do my tasks well'
  })
  @Expose()
  public personalInfo: string;

  @ApiProperty({
    description: 'Customer or executor',
    example: 'executor'
  })
  @Expose()
  public role: UserRole;
}
