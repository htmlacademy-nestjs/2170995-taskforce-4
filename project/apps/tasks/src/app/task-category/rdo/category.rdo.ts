import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryRdo {
  @ApiProperty({
    description: 'The uniq category ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose()
  public categoryId: string;

  @ApiProperty({
    description: 'Category title',
    example: 'Ремонт',
  })
  @Expose()
  public title: string;
}
