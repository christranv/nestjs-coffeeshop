import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import TokenPayload from '../auth/token-payload.dto';

export const TokenClaim = createParamDecorator(
    (_: string, ctx: ExecutionContext): TokenPayload => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);