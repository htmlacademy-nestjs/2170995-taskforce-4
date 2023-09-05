import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({
    description: 'The uniq tag ID',
    example: '1',
    required: true,
  })
  @Expose()
  public tagId: string;

  @ApiProperty({
    description: 'The tag name',
    example: 'fix',
    required: true,
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'The created date',
    example: '2023-01-01',
    required: true,
  })
  @Expose()
  public createdAt: string;
}
