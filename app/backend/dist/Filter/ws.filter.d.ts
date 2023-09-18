import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
export declare class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: WsException | HttpException, host: ArgumentsHost): void;
}
