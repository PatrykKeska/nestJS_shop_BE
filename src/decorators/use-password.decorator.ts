import { SetMetadata } from '@nestjs/common';

export const UsePassword = (password: string) =>
  SetMetadata('goodProtectPassword', password);
