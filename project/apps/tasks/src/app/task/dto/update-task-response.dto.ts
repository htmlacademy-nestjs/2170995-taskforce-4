import { TASK_USER_ROLE_NOT_VALID } from './../task.constant';
import { UserRole } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateTaskResponseDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc',
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'Customer or executor',
    example: 'executor'
  })
  @IsEnum(UserRole, { message: TASK_USER_ROLE_NOT_VALID })
  public role: UserRole;

  @ApiProperty({
    description: 'The price of the work offered by the contractor',
    example: '1000',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  public offerPrice?: number;
}
