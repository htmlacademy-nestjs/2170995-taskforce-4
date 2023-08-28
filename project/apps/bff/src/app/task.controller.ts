import { ApplicationServiceURL } from './app.config';
import { AddNewTaskDto } from './dto/add-new-task';
import { UserIdInterceptor } from './interseptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TaskController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: AddNewTaskDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Task}/`, dto);
    return data;
  }
}
