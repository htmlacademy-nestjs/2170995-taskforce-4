import {ApiProperty} from "@nestjs/swagger";
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review text',
    example: 'All good',
  })
  @IsString()
  @Length(50, 500, { message: 'The review should have min length is 50, max is 500' })
  public review: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 'fdsafs-e5fsdae4-54fds-fdsa5-jfsdalkflsa544'
  })
  @Transform(({ value }) => +value)
  public taskId: number;

  @ApiProperty({
    description: 'Performers rating',
    example: '3'
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'fsdaf43lj4_klsaj3',
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'The uniq executor ID',
    example: 'faljrflw32ijrflkasd',
  })
  @IsString()
  public executorId: string;
}
