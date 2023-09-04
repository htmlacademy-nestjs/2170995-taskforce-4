import { ApiProperty } from '@nestjs/swagger';
import { City, TaskStatus, Category } from '@project/shared/app-types';
import { IsDate, IsEnum, IsNumber, IsPositive, IsString, Length, Min, MinDate } from 'class-validator';
import { TASK_CITY_NOT_VALID, TASK_STATUS_NOT_VALID } from '../task.constant';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Fix door'
  })
  @IsString()
  @Length(20, 50, { message: 'Min length is 20, max is 50' })
  public title?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Fix the door lock'
  })
  @IsString()
  @Length(100, 1024, { message: 'Min length is 100, max is 1024' })
  public description?: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Fix'
  })
  @IsString()
  public category?: Category[];

  @ApiProperty({
    description: 'The cost of the task',
    example: '1000'
  })
  @IsNumber()
  @IsPositive()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Due date for the task',
    example: '2023-10-10'
  })
  @IsDate()
  @MinDate(new Date())
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
  @IsString()
  @Length(10, 255, { message: 'Min length is 10, max is 255' })
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
  @IsEnum(City, { message: TASK_CITY_NOT_VALID })
  public city?: City;

  @ApiProperty({
    description: 'The task can be in one of five statuses: New, Canceled, At work, Completed, Failed',
    example: 'Completed'
  })
  @IsEnum(TaskStatus, { message: TASK_STATUS_NOT_VALID })
  public status?: TaskStatus;
}
