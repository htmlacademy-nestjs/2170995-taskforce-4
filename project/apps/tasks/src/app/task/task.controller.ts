import { ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger';
import { TaskRDO } from './rdo/task.rdo';
import { fillObject } from '@project/util/util-core';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Body, Post, Get, Param, Controller, Delete, HttpStatus } from '@nestjs/common';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @ApiResponse({
    type: TaskRDO,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created'
  })
  @Post('create')
  public async create(@Body() dto: CreateTaskDTO) {
    const newTask = await this.taskService.createTask(dto);

    return fillObject(TaskRDO, newTask);
  }

  @ApiResponse({
    type: TaskRDO,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRDO, existTask);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
  }
}
