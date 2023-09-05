import { Controller, Get } from '@nestjs/common';
import { TaskTagService } from './task-tag.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { TagRdo } from './rdo/tag.rdo';
import { fillObject } from '@project/util/util-core';

@ApiTags('Actions with tags')
@Controller('tags')
export class TaskTagsController {
  constructor(private readonly taskTagsService: TaskTagService) {}

  @ApiResponse({
    status: HttpStatusCode.Ok,
    description: 'List of all tags',
    type: TagRdo,
  })
  @Get()
  findAllTags() {
    const tags = this.taskTagsService.getTags();
    return fillObject(TagRdo, tags);
  }
}
