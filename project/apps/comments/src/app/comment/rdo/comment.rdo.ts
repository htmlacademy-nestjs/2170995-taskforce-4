import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'good job',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date the comment was created',
    example: '2023-01-18'
  })
  @Expose()
  public createdAt: Date;
}
