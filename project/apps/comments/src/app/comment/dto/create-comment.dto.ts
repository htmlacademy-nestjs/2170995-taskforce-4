import { ApiProperty } from '@nestjs/swagger';


export class CreateCommentDTO {
  @ApiProperty({
    description: 'Comment text',
    example: 'good job',
  })
  public text: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  public taskId: string;
}
