import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class ViewAuthFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
