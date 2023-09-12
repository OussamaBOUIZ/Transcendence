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
      console.log('YES BROT')
       const ctx = host.switchToHttp();
       const response = ctx.getResponse<Response>();
       const status = exception.getStatus();
    
       response.status(status).redirect('http://localhost:5173/');
     }
   }
   
   