import { User } from '../user.entity';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
