import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class AllExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
