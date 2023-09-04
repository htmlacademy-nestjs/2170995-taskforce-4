import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Length, IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'erwqh32i3jlwf',
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'good job',
  })
  @IsString()
  @Length(10, 300, { message: 'The text should have min length is 10, max is 300'})
  public text: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: '1'
  })
  @IsNumber()
  @Transform(({ value }) => +value)
  public taskId: number;
}
