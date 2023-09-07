import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const enum ErrorStrings {
  BAD_MONGOID_ERROR = 'Bad entity ID',
  BAD_MONGOID_PARAMS = 'This pipe must used only with params!'
}

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(ErrorStrings.BAD_MONGOID_PARAMS)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ErrorStrings.BAD_MONGOID_ERROR);
    }

    return value;
  }
}
