import { ApiProperty } from '@nestjs/swagger';
import { City, TaskStatus, Category, Tag } from '@project/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class TaskRdo {
  @ApiProperty({
    description: 'The uniq task ID',
    example: '1'
  })
  @Expose()
  public TaskId: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Fix door'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Fix the door lock'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Fix'
  })
  @Expose()
  public category: Category;

  @ApiProperty({
    description: 'The cost of the task',
    example: '1000'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Due date for the task',
    example: '2023-10-10'
  })
  @Expose()
  public dueDate: Date;

  @ApiProperty({
    description: 'Image for the task',
    example: 'https://images/picture.jpeg'
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Karl Marx street 10, apartment 111'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'List of tags for the task',
    example: 'fix, tobreak, takeoutthetrash'
  })
  @Transform(({ value }) => value.map((tag: Tag) => tag.text))
  @Expose()
  public tags: Tag[];

  @ApiProperty({
    description: 'One city from the list',
    example: 'Moscow'
  })
  @Expose()
  public city: City;

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

  @ApiProperty({
    description: 'The task can be in one of five statuses: New, Canceled, At work, Completed, Failed',
    example: 'Completed'
  })
  @Expose()
  public status: TaskStatus;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Number of responses',
    example: '5'
  })
  @Expose()
  public responsesCount: number;

  @ApiProperty({
    description: 'Number of comments',
    example: '15'
  })
  @Expose()
  public commentCount: number;
}
