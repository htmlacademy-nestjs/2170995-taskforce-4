import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class ReviewRdo {
  @ApiProperty({
    description: 'Unique Review ID',
    example: 'fdsafdsa-9ffrewfsad5-42154-fdsaf5-fsa'
  })
  @Expose()
  public reviewId: string;

  @ApiProperty({
    description: 'Review text',
    example: 'All good',
  })
  @Expose()
  public review: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 'fdsafs-e5fsdae4-54fds-fdsa5-jfsdalkflsa544'
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Performers rating',
    example: '3'
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'The uniq executor ID',
    example: 'b6b11e86-e5e4-4ee7-a0e5-41730b7671cc'
  })
  @Expose()
  public executorId: string;

  @ApiProperty({
    description: 'Date the comment was created',
    example: '2023-01-18'
  })
  @Expose()
  public createdAt: Date;
}
