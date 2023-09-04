import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { TaskResponseService } from './task-response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseRdo } from './rdo/response.rdo';
import { fillObject } from '@project/util/util-core';

@ApiTags('Actions with task responses')
@Controller('response')
export class TaskResponseController {
  constructor(private readonly taskResponseService: TaskResponseService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Creating a response to a task',
    type: ResponseRdo,
  })
  @Post('create')
  async create(@Body() dto: CreateResponseDto) {
    const newResponse = this.taskResponseService.create(dto);
    return fillObject(ResponseRdo, newResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all the responses of the task',
    type: [ResponseRdo],
  })
  @Get('/:taskId')
  public async findTaskResponses(@Param('taskId') id: number) {
    const existResponses = await this.taskResponseService.findResponsesByTaskId(id);
    return fillObject(ResponseRdo, existResponses);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all user feedback',
    type: [ResponseRdo],
  })
  @Get('/:userId')
  async findUserResponses(@Param('userId') userId: string) {
    const existResponses = this.taskResponseService.findResponsesByUserId(userId);
    return fillObject(ResponseRdo, existResponses);
  }
}
