import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';
import { ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { Body, Post, Get, Param, Controller, Delete, HttpStatus, HttpCode, Patch, Query } from '@nestjs/common';
import { TaskQuery } from './query/task.query';
@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found'
  })
  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created'
  })
  @Post('/')
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskService.deleteTask(id);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task has been successfully updated'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updateTask = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, updateTask);
  }
}
