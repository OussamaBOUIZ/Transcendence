import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
export declare class FormCheck implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Response<any, Record<string, any>>;
}
