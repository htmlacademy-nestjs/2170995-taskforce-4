import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { ReviewService } from './review.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created'
  })
  @Post('create')
  public async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.createReview(dto);

    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'Review found'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existReview = await this.reviewService.getReview(id);
    return fillObject(ReviewRdo, existReview);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The review has been successfully deleted'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.reviewService.deleteReview(id);
  }
}
