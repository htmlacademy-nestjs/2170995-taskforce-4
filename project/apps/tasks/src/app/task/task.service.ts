import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { RESPONSE_NOT_FOUND, TAGS_MAX_COUNT, TASK_CANT_TAKE, TASK_EXECUTOR_APPOINTED, TASK_EXECUTOR_A_HAS_JOB, TASK_EXECUTOR_EXISTS, TASK_NOT_FOUND, TASK_STATUS_CONDITIONS_WRONG } from './task.constant';
import { TaskResponseService } from './../task-response/task-response.service';
import { TaskTagService } from './../task-tag/task-tag.service';
import { TaskCategoryService } from './../task-category/task-category.service';
import { TaskQuery } from './query/task.query';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Response, SortType, Task, TaskStatus, UserRole } from '@project/shared/app-types';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';


@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCategoryService: TaskCategoryService,
    private readonly taskTagService: TaskTagService,
    private readonly taskResponseService: TaskResponseService,
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const category = await this.taskCategoryService.findOrCreateCategory(dto.category);
    const tagsArray = Array.from(new Set(dto.tags)).slice(0, TAGS_MAX_COUNT);
    const tags = await this.taskTagService.findOrCreateMany(tagsArray);

    const taskEntity = new TaskEntity({
      ...dto,
      categoryId: category.categoryId,
      comments: [],
      tags,
      responses: [],
    });

    return this.taskRepository.create(taskEntity);
  }

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async deleteTask(id: number): Promise<void> {
    return this.taskRepository.destroy(id);
  }

  async getTasks(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.find(query);
  }

  async updateTaskStatus(taskId: number, dto:UpdateTaskStatusDto): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);

    if(!task) {
      throw new NotFoundException(TASK_NOT_FOUND)
    }

    if(dto.userId !== task.userId && dto.userId !== task.executorId) {
      throw new ForbiddenException()
    }

    switch (task.status) {
      case TaskStatus.New:
        if (
          dto.userId === task.userId &&
          ((dto.status === TaskStatus.Cancelled && !task.executorId) ||
            dto.status === TaskStatus.AtWork)
        ) {
          return this.taskRepository.updateStatus(taskId, dto.status);
        }
        break;
      case TaskStatus.AtWork:
        if (
          dto.executorId === task.executorId &&
          (dto.status === TaskStatus.Failed || dto.status === TaskStatus.Completed)
        ) {
          return this.taskRepository.updateStatus(taskId, dto.status);
        }
        break;
    }
    throw new BadRequestException(TASK_STATUS_CONDITIONS_WRONG);
  }

  async incrementCommentsCounter( taskId: number, increment: number): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    let count = task.commentsCount + increment;
    count = count < 0 ? 0 : count;
    return this.taskRepository.updateCommentsCounter(taskId, count);
  }

  async incrementResponsesCounter( taskId: number, increment: number): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    let count = task.responsesCount + increment;
    count = count < 0 ? 0 : count;
    return this.taskRepository.updateResponsesCounter(taskId, count);
  }

  async setAcceptedResponse(acceptedResponse: Response): Promise<Task | null> {
    const task = await this.getTask(acceptedResponse.taskId);
    const price = acceptedResponse.offerPrice ?? task.price;

    if (!task) throw new NotFoundException(TASK_NOT_FOUND);
    if (task.executorId) throw new BadRequestException(TASK_EXECUTOR_EXISTS);

    return this.taskRepository.setAcceptedResponse(
      task.taskId,
      acceptedResponse.executorId,
      price
    );
  }

  async getNewTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({
      ...query,
      userId: userId,
      status: TaskStatus.New,
    });
  }

  async getCustomerTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({
      ...query,
      userId: userId,
      sortType: SortType.CreatedAt,
    });
  }

  async getCustomerTasksNumber(userId: string, query: TaskQuery) {
    return this.taskRepository.countCustomerTasks({ ...query, userId: userId });
  }

  async getExecutorTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({
      ...query,
      executorId: userId,
      sortType: SortType.Status,
    });
  }

  async getExecutorTasksNumber(executorId: string, query: TaskQuery) {
    return this.taskRepository.countExecutorTasks({
      ...query,
      executorId,
    });
  }

  public async addExecutor(taskId: number, dto: UpdateTaskResponseDto) {
    const { role, userId, offerPrice } = dto;
    const task = await this.taskRepository.findById(taskId);
    const executorTaskInWork = this.taskRepository.findExecutorAtWork(userId);
    const price = offerPrice ?? task.price;

    if (role !== UserRole.Executor) {
      throw new ForbiddenException(TASK_CANT_TAKE);
    }

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    if (task.executorId) {
      throw new ForbiddenException(TASK_EXECUTOR_APPOINTED);
    }

    if (executorTaskInWork)
      throw new BadRequestException(TASK_EXECUTOR_A_HAS_JOB);


    return this.taskRepository.addExecutor(taskId, userId, price);
  }

public async addResponse(taskId: number, dto: UpdateTaskResponseDto) {
    const { role, userId, offerPrice } = dto;
    const task = await this.taskRepository.findById(taskId);
    const price = offerPrice ?? task.price;
    const response = this.taskResponseService.create({
    executorId: userId,
    taskId,
    offerPrice: price,
    });
    const responseId = (await response).responseId;

    if (role !== UserRole.Executor) {
    throw new ForbiddenException(TASK_CANT_TAKE);
    }

    if (!task) {
    throw new NotFoundException(TASK_NOT_FOUND);
    }

    if (!response) {
    throw new NotFoundException(RESPONSE_NOT_FOUND);
    }

    return await this.taskRepository.addResponse(responseId, taskId);
  }

  public async update(taskId: number, dto: UpdateTaskDto) {
    const existTask = await this.taskRepository.findById(taskId);
    const newTaskEntity = new TaskEntity({ ...existTask, ...dto });

    if(!existTask) throw new NotFoundException(TASK_NOT_FOUND);

    return await this.taskRepository.update(taskId, newTaskEntity);
  }
}
