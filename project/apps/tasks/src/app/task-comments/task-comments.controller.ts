import { HttpStatusCode } from 'axios';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { TaskCommentService } from './task-comments.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly taskCommentService: TaskCommentService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created'
  })
  @HttpCode(HttpStatusCode.Created)
  @Post('create')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.taskCommentService.create(dto);

    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment found'
  })
  @Get(':id')
  public async show(@Param('id') id: number) {
    const existComment = await this.taskCommentService.getComment(id);
    return fillObject(CommentRdo, existComment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been successfully deleted'
  })
  @HttpCode(HttpStatusCode.NoContent)
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    await this.taskCommentService.deleteComment(id);
  }

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatusCode.Ok,
    description: 'Find all comments by TaskId',
  })
  @Get(':id')
  async findTaskComments(@Param('id') id: number) {
    const currentComment = await this.taskCommentService.findCommentsByTaskId(id);
    return fillObject(CommentRdo, currentComment);
  }
}

