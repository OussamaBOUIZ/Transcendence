import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    BadGatewayException,
    BadRequestException,
   } from '@nestjs/common';
   import { Response } from 'express';
   import { UnauthorizedException } from '@nestjs/common';
      
   @Catch(BadRequestException)
   export class FormCheck implements ExceptionFilter {
     catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const str: string = exception.getResponse().toString();
      // const res = JSON.parse(str);
      return response.status(status).send(exception.message);
     }
   }
   