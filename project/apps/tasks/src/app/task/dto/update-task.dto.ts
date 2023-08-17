import { ApiProperty } from '@nestjs/swagger';
import { City, TaskStatus, Category } from '@project/shared/app-types';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Fix door'
  })
  public title?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Fix the door lock'
  })
  public description?: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Fix'
  })
  public category?: Category[];

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
  public city?: City;

  @ApiProperty({
    description: 'The task can be in one of five statuses: New, Canceled, At work, Completed, Failed',
    example: 'Completed'
  })
  public status?: TaskStatus;
}
