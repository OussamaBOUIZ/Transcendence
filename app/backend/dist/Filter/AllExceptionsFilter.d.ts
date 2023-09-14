import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class AllExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
