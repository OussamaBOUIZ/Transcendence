import {Socket} from 'socket.io';
import {ChatGatewayService} from "./userchat.service";


type SocketIOMiddleWare = {
    (client: Socket, next: (err?: Error) => void);
};


export const SocketAuthMiddleware = (
    configService: ChatGatewayService,
): SocketIOMiddleWare => {
    return (client, next) => {
        try {
            const {authorization} = client.handshake.headers;
            client.data.user = configService.isValidAuthHeader(authorization);
            next();
        } catch (error) {
            next(error);
        }
    };
};