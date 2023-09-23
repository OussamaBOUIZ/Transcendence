import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    BadGatewayException,
    BadRequestException,
   } from '@nestjs/common';
   import { Response } from 'express';
      
   @Catch(BadRequestException)
   export class FormCheck implements ExceptionFilter {
     catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const str: string = exception.getResponse().toString();
      // console.log('HERE SIGN IS3333')
      return response.status(status).send(exception.message);
     }
   }
   