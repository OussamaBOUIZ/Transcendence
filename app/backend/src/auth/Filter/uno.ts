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
   export class exce implements ExceptionFilter {
     catch(exception: HttpException, host: ArgumentsHost) {
     }
   }
   