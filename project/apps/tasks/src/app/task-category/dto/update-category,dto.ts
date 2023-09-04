import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Category title',
    example: 'Ремонт',
  })
  @IsString()
  public title: string;
}
