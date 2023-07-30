import {ApiProperty} from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review text',
    example: 'All good',
  })
  public review: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 'fdsafs-e5fsdae4-54fds-fdsa5-jfsdalkflsa544'
  })
  public taskId: string;

  @ApiProperty({
    description: 'Performers rating',
    example: '3'
  })
  public rating: number;
}
