import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';
import { ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { Body, Post, Get, Param, Controller, Delete, HttpStatus, HttpCode, Patch, Query } from '@nestjs/common';
import { TaskQuery } from './query/task.query';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';
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
    status: HttpStatus.CREATED,
    description: 'The status of task has been successfully updated.',
  })
  @Patch('/:id/status')
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateTaskStatusDto) {
    const updatedTask = await this.taskService.updateTaskStatus(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The executer has been successfully added.',
  })
  @Patch('/:taskId/executor')
  async addExecutorToTask(@Param('taskId') taskId: number, @Body() dto: UpdateTaskResponseDto) {
    const updatedTask = await this.taskService.addExecutor(taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The executer has been successfully added.',
  })
  @Patch('/:taskId/response')
  async addResponseToTask(@Param('taskId') taskId: number, @Body() dto: UpdateTaskResponseDto) {
    const updatedTask = await this.taskService.addResponse(taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'New tasks found.',
  })
  @Get('/:userId/new')
  async getCustomerNewTasks(@Param('userId') userId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found.',
  })
  @Get('/customer/:userId/my')
  async getCustomerTasks(@Param('userId') userId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getCustomerTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found.',
  })
  @Get('/customer/:userId/count')
  async getCustomerTasksCount(@Param('userId') userId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getCustomerTasksNumber(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found.',
  })
  @Get('/executer/:executorId/my')
  async getExecuterTasks(@Param('userId') userId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getExecutorTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found.',
  })
  @Get('/executer/:executerId/count')
  async getexecuterTasksCount(@Param('executerId') executerId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getCustomerTasksNumber(
      executerId,
      query
    );
    return fillObject(TaskRdo, tasks);
  }
}
