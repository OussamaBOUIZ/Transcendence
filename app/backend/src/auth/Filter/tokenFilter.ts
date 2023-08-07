import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
   } from '@nestjs/common';
   import { Response } from 'express';
   import { UnauthorizedException } from '@nestjs/common';
      
   @Catch(UnauthorizedException)
   export class tokenValidity implements ExceptionFilter {
     catch(exception: HttpException, host: ArgumentsHost) {
        console.log('HEEERE')
       const ctx = host.switchToHttp();
       const response = ctx.getResponse<Response>();
       const status = exception.getStatus();
       return response.status(status).send(false);
     }
   }
   