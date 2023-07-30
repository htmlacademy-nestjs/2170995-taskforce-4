import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentService } from './comment.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created'
  })
  @Post('create')
  public async create(@Body() dto: CreateCommentDTO) {
    const newComment = await this.commentService.createComment(dto);

    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment found'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existComment = await this.commentService.getComment(id);
    return fillObject(CommentRdo, existComment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been successfully deleted'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.commentService.deleteComment(id);
  }
}

