import { TASK_STATUS_NOT_VALID } from './../task.constant';
import { ApiProperty } from '@nestjs/swagger';
import { City, TaskStatus } from '@project/shared/app-types';
import { IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Length, Min, MinDate } from 'class-validator';
import { TASK_CITY_NOT_VALID } from '../task.constant';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Fix door'
  })
  @IsString()
  @Length(20, 50, { message: 'The title should have min length is 20, max is 50' })
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Fix the door lock'
  })
  @IsString()
  @Length(100, 1024, { message: 'The title should have min length is 100, max is 1024' })
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Repair'
  })
  @IsString()
  public category: string;

  @ApiProperty({
    description: 'The cost of the task',
    example: '1000'
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Due date for the task',
    example: '2023-10-10'
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  @IsOptional()
  public dueDate?: Date;

  @ApiProperty({
    description: 'Image for the task',
    example: 'https://images/picture.jpeg'
  })
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Karl Marx street 10, apartment 111'
  })
  @IsString()
  @IsOptional()
  @Length(10, 255, { message: 'Min length is 10, max is 255' })
  public address?: string;

  @ApiProperty({
    description: 'List of tags for the task',
    example: 'fix, tobreak, takeoutthetrash'
  })
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'One city from the list',
    example: 'Moscow'
  })
  @IsEnum(City, { message: TASK_CITY_NOT_VALID })
  public city: City;

  @ApiProperty({
    description: 'One status from the list',
    example: 'New'
  })
  @IsEnum(TaskStatus, { message: TASK_STATUS_NOT_VALID })
  public status: TaskStatus;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @IsString()
  public userId: string;
}
