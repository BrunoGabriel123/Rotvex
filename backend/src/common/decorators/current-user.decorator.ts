import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserData {
  id: string;
  email: string;
  name: string;
  companyId: string;
  roleId: string;
}

export const CurrentUser = createParamDecorator(
  (
    data: keyof CurrentUserData | undefined,
    ctx: ExecutionContext,
  ): CurrentUserData | string => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: CurrentUserData }>();

    const user = request.user as CurrentUserData;

    if (data) {
      return user[data];
    }

    return user;
  },
);
