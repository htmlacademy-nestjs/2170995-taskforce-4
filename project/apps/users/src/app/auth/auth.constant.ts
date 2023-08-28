import { City } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';

export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
export const AUTH_USER_DATE_BIRTH_NOT_VALID = 'The user date birth is not valid';
export const AUTH_USER_CITY_NOT_VALID = `The City must be ${City.Moscow}, ${City.SPB} or ${City.Vladivostok}`;
export const AUTH_USER_ROLE_NOT_VALID = `The user role must be ${UserRole.Customer} or ${UserRole.Executor}`;
export const AUTH_MIN_USER_AGE = 18;
export const AUTH_USER_NOT_VALID_MIN_AGE = `The user is not ${AUTH_MIN_USER_AGE} year old`;

