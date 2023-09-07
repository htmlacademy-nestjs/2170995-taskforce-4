import { UserRole } from '@project/shared/app-types';

import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../task.constant';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
