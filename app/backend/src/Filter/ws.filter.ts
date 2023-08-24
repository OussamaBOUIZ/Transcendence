import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  public catch(exception:  WsException | HttpException, host: ArgumentsHost) {
    const client: Socket = host.switchToWs().getClient();
    const error = exception instanceof WsException ? exception.getError() : exception.getResponse()

    client.to(client?.id).emit('error', error)
  }

}