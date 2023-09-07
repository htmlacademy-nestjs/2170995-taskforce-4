import {plainToInstance, ClassConstructor} from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number, unit: DateTimeUnit };

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function userAge(date: string): number {
  return ((new Date().getTime() - new Date(date).getTime()) / (24 * 3600 * 365 * 1000)) | 0;
}

export function uniqArray(array: string[]) {
  return [...new Set(array)]
}

export function uniqTagArray(array: string[]) {
  return [...new Set(array)].map((item) => {
    if (item.substring(0, 1).match(/^[A-Za-zа-яёА-ЯЁ]/)) {
      return item.replace(/\s+/g,'').toLowerCase()
    } else {
      throw new BadRequestException('The tag must start with a letter.')
    }
  })
}

