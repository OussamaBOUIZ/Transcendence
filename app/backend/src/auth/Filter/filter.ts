import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
   } from '@nestjs/common';
   import { Response } from 'express';
   import { UnauthorizedException } from '@nestjs/common';
      
   @Catch(UnauthorizedException)
   export class ViewAuthFilter implements ExceptionFilter {
     catch(exception: HttpException, host: ArgumentsHost) {
      console.log('exception catched');
       const ctx = host.switchToHttp();
       const response = ctx.getResponse<Response>();
       const status = exception.getStatus();
       return response.status(status).redirect('http://localhost:5173/');
     }
   }
   