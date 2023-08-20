import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../task.constant';
import { City, TaskStatus } from '@project/shared/app-types';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((categoryId) => +categoryId))
  @IsArray({})
  @IsOptional()
  public categories?: number[];

  @Transform(({ value }) => value.split(',').map((tagId) => +tagId))
  @IsArray({})
  @IsOptional()
  public tags?: number[];

  @IsOptional()
  public city?: City;

  @IsOptional()
  public status?: TaskStatus;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
