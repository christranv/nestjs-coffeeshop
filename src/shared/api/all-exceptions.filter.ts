import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DomainException } from '../domain/exceptions/domain.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: Error, host: ArgumentsHost): void {
        Logger.error(exception.message, exception.stack);
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        let httpStatus = null;
        switch (exception.constructor) {
            case UnauthorizedException:
                httpStatus = HttpStatus.UNAUTHORIZED;
                break;
            case DomainException || NotFoundException || BadRequestException:
                httpStatus = HttpStatus.BAD_REQUEST;
                break;
            case HttpException:
                httpStatus = (exception as HttpException).getStatus()
                break;
            default:
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                break;
        }

        const responseBody = {
            message: exception.message,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            timestamp: new Date().toISOString(),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}