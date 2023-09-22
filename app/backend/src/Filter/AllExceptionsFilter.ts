import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let message;
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    console.log('message is: ', status, exception.message);
    if (status == 500)
      message = 'Internal Server Error';
    else if (status == 400)
      message = 'Bad Input Data';
    else if (status == 404)
      message = 'Resourse Not Found';
    else
      message = exception.message;
    if (status === 401)
      response.redirect('http://localhost:5173/sign');
    else
    {
      response.status(status).json({
        statusCode: status,
        message: `${message}`
      });
    }
  }
}