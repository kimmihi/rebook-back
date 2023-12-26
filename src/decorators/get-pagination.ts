import type { Pagination } from 'src/types/pagination';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetPagination = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const paginationParams: Pagination = {
      page: 1,
      size: 10,
    };

    paginationParams.page = req.query.page
      ? parseInt(req.query.page.toString())
      : 1;
    paginationParams.size = req.query.size
      ? parseInt(req.query.size.toString())
      : 10;

    return paginationParams;
  },
);
