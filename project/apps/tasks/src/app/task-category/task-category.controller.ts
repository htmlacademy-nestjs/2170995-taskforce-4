import { CreateCategoryDto } from './dto/create-category.dto';
import { fillObject } from '@project/util/util-core';
import { TaskCategoryService } from './task-category.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CategoryRdo } from './rdo/category.rdo';
import { UpdateCategoryDto } from './dto/update-category,dto';

@Controller('categories')
export class TaskCategoryController {
  constructor(
    private readonly taskCategoryService: TaskCategoryService
  ) {}

  @Get('/id')
  async show(@Param('id') id:number) {
    const existCategory = await this.taskCategoryService.getCategory(id);
    return fillObject(CategoryRdo, existCategory);
  }

  @Get('/')
  async index() {
    const categories = await this.taskCategoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.taskCategoryService.createCategory(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskCategoryService.deleteCategory(id);
  }

  @Patch('/:id')
  async update(@Param('id') id:number, @Body() dto: UpdateCategoryDto) {
    const updateCategory = await this.taskCategoryService.updateCategory(id, dto)
    return fillObject(CategoryRdo, updateCategory);
  }
}
