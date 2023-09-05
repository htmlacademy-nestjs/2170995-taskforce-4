import { SortType, TaskStatus, City } from '@project/shared/app-types';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE } from '../task.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((categoryId) => +categoryId))
  @IsArray({})
  @IsOptional()
  public categoryId?: number;

  @Transform(({ value }) => value as City)
  @IsEnum(City)
  @IsOptional()
  public city?: City;

  @Transform(({ value }) => value as TaskStatus)
  @IsEnum(TaskStatus)
  @IsOptional()
  public status?: TaskStatus;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @IsOptional()
  public sortType?: SortType = DEFAULT_SORT_TYPE;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsOptional()
  public tag?: string;

  @IsOptional()
  public userId?: string;

  @IsOptional()
  public executorId?: string;
}
