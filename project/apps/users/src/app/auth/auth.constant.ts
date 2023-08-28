import { City } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';

export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
export const AUTH_USER_DATE_BIRTH_NOT_VALID = 'The user date birth is not valid';
export const AUTH_USER_CITY_NOT_VALID = `The City must be ${City.toString()}`
export const AUTH_USER_ROLE_NOT_VALID = `The user role must be ${UserRole.toString()}`
