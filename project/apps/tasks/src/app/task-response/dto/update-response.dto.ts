import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';


export class UpdateResponseDto {
  @ApiProperty({
    description: 'The price of the work offered by the contractor',
    example: 10,
  })
  @IsNumber()
  public offerPrice?: number;
}
