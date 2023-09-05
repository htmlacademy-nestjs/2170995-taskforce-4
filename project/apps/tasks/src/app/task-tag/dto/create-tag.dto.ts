import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';


export class CreateTagDto {
  @ApiProperty({
    description: 'The tag name',
    example: 'fix'
  })
  @IsString()
  @Length(3, 10, { message: 'Min length is 3, max is 10' })
  public text: string
}
