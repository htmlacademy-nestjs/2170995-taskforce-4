import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';
import { ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { Body, Post, Get, Param, Controller, Delete, HttpStatus, HttpCode, Patch } from '@nestjs/common';

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
  async show(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    const task = await this.taskService.getTask(taskId);
    return fillObject(TaskRdo, task);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found'
  })
  @Get('/')
  async index() {
    const tasks = await this.taskService.getTasks();
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
  async destroy(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    this.taskService.deleteTask(taskId);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task has been successfully updated'
  })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const taskId = parseInt(id, 10);
    const updateTask = await this.taskService.updateTask(taskId, dto);
    return fillObject(TaskRdo, updateTask);
  }
}
