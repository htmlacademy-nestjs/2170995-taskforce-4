import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@project/shared/app-types';
import { IsEnum, IsString } from 'class-validator';
import { TASK_STATUS_NOT_VALID } from '../task.constant';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'One status from the list',
    example: 'New'
  })
  @IsEnum(TaskStatus, { message: TASK_STATUS_NOT_VALID })
  public status: TaskStatus;

  @ApiProperty({
    description: 'The uniq executor ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @IsString()
  public executorId?: string;
}
