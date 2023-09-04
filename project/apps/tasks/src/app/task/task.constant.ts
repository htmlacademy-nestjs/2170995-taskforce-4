import { SortType } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';
import { TaskStatus } from '@project/shared/app-types';
import { City } from '@project/shared/app-types';

export const enum SortDirection {
  desc = 'desc',
  asc = 'asc',
}

export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const TAGS_MAX_COUNT = 5;
export const DEFAULT_SORT_DIRECTION = SortDirection.desc;
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;

export const TASK_CITY_NOT_VALID = `The City must be ${City.Moscow}, ${City.SPB} or ${City.Vladivostok}`;
export const TASK_STATUS_NOT_VALID = `The task status must be ${TaskStatus.New}, ${TaskStatus.Failed}, ${TaskStatus.Completed}, ${TaskStatus.Cancelled} or ${TaskStatus.AtWork}`;
export const TASK_USER_ROLE_NOT_VALID = `The user role must be ${UserRole.Customer} or ${UserRole.Executor}`;
export const TASK_NOT_FOUND = `Task is not found.`;
export const TASK_NOT_FORBIDDEN = `The task is prohibited.`;
export const TASK_STATUS_CONDITIONS_WRONG = `Update status conditions are wrong.`;
export const TASK_EXECUTOR_EXISTS = `The executor already exists.`;
export const TASK_CANT_TAKE = `You're not executor.`;
export const TASK_EXECUTOR_APPOINTED = `The executor has been already appointed.`;
export const TASK_EXECUTOR_A_HAS_JOB = `The executor already has a job.`;
export const RESPONSE_NOT_FOUND = 'Response is not found';
export const TASK_UPDATE_VALID = 'A user with this role cannot assign this status';







