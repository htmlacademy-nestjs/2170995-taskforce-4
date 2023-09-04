import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateResponseDto {
  @ApiProperty({
    description: 'The uniq executor ID',
    example: 'fsdaf43lj4_klsaj3',
  })
  @IsString()
  public executorId: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: '1',
  })
  @IsNumber()
  public taskId: number;

  @ApiProperty({
    description: 'The price of the work offered by the contractor',
    example: 10,
  })
  @IsNumber()
  public offerPrice?: number;
}
