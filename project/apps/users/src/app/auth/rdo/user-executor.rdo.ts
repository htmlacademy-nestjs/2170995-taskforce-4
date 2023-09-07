import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class UserExecutorRdo {
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
    description: 'Age in years',
    example: '30',
  })
  @Expose()
  public age: number;

  @ApiProperty({
    description: 'Customer or executor',
    example: 'executor'
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Executor rating',
    example: '5'
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Number of completed tasks',
    example: '10'
  })
  @Expose()
  public completedTasks: number;

  @ApiProperty({
    description: 'Number of failed tasks',
    example: '1'
  })
  @Expose()
  public failedTasks: number;

  @ApiProperty({
    description: 'User email',
    example: 'stiv@mail.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Information about yourself.',
    example: 'I do my tasks well'
  })
  @Expose()
  public personalInfo: string;

  @ApiProperty({
    description: 'Specialization.',
    example: 'The Bricklayer'
  })
  @Expose()
  public specialization: string[];

  @ApiProperty({
    description: 'Place in the rating',
    example: '6'
  })
  @Expose()
  public placeInRating: number;
}
