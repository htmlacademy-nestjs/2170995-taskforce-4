import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { TaskReviewService } from './task-reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';

@ApiTags('Actions with review')
@Controller('reviews')
export class TaskReviewController {
  constructor(
    private readonly taskReviewService: TaskReviewService,
    ) {}

  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'The new review has been successfully created.',
    type: ReviewRdo,
  })
  @HttpCode(HttpStatusCode.Created)
  @Post('create')
  public async create(@Body() dto: CreateReviewDto) {
    const newReview = this.taskReviewService.create(dto);
    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'All reviews query',
  })
  @Get()
  public async findAll() {
    const allReviews = this.taskReviewService.findAll();
    return fillObject(ReviewRdo, allReviews);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'Find review by id',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const currentReview = this.taskReviewService.findOne(+id);
    return fillObject(ReviewRdo, currentReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'Find reviews by executor Id',
  })
  @Get(':executorId/reviews')
  public async findByExecutorId(@Param('executorId') executorId: string) {
    const existsReview = await this.taskReviewService.findByExecutorId(executorId);
    return fillObject(ReviewRdo, existsReview);
  }

  @ApiResponse({
    status: HttpStatusCode.Ok,
    description: 'Find rating of executor',
  })
  @Get(':executorId/rating')
  public async findRatingByExecutorId(@Param('executorId') executorId: string) {
    return this.taskReviewService.findRating(executorId);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete review',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  public async remove(@Param('id') id: number) {
    this.taskReviewService.delete(id);
  }
}
