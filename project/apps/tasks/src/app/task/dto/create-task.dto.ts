import { ApiProperty } from '@nestjs/swagger';
import { City, TaskStatus } from '@project/shared/app-types';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Fix door'
  })
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Fix the door lock'
  })
  public description: string;

  public categories: number[];

  @ApiProperty({
    description: 'The cost of the task',
    example: '1000'
  })
  public price?: number;

  @ApiProperty({
    description: 'Due date for the task',
    example: '2023-10-10'
  })
  public dueDate?: Date;

  @ApiProperty({
    description: 'Image for the task',
    example: 'https://images/picture.jpeg'
  })
  public image?: string;

  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Karl Marx street 10, apartment 111'
  })
  public address?: string;

  @ApiProperty({
    description: 'List of tags for the task',
    example: 'fix, tobreak, takeoutthetrash'
  })
  public tags?: string[];

  @ApiProperty({
    description: 'One city from the list',
    example: 'Moscow'
  })
  public city: City;

  @ApiProperty({
    description: 'Date the task was created',
    example: '2023-08-18'
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'One status from the list',
    example: 'New'
  })
  public status: TaskStatus;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  public userId: string;
}
