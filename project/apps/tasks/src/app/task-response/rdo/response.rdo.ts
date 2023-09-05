import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseRdo {
  @ApiProperty({
    description: 'The uniq response ID',
    example: '1',
  })
  @Expose()
  public responseId: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: '1',
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'The uniq executor ID',
    example: 'fsdaf43lj4_klsaj3',
  })
  @Expose()
  public executorId: string;

  @ApiProperty({
    description: 'The price of the work offered by the contractor',
    example: '10',
  })
  @Expose()
  public offerPrice: number;
}
