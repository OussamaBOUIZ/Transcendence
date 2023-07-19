import {Socket} from 'socket.io';
import {ChatGatewayService} from "./userchat.service";
import {UserService} from "../user/user.service";


type SocketIOMiddleWare = {
    (client: Socket, next: (err?: Error) => void);
};


export const SocketAuthMiddleware = (
    userService: UserService,
): SocketIOMiddleWare => {
    return (client, next) => {
        try {
            const {authorization} = client.handshake.headers;
            client.data.user = userService.getUserFromJwt(authorization);
            next();
        } catch (error) {
            next(error);
        }
    };
};