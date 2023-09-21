import {Socket} from 'socket.io';
import {UserService} from "../user/user.service";
import {UnauthorizedException} from  "@nestjs/common"


type SocketIOMiddleWare = {
    (client: Socket, next: (err?: Error) => void);
};


export const SocketAuthMiddleware = (
    userService: UserService,
): SocketIOMiddleWare => {
    return  async (client, next) => {
        try {
            const {auth} = client.handshake;
            const token = auth.token || client.handshake.headers.authorization
            client.data.user = await userService.getUserFromJwt(token);
            if (client.data.user == null)
                throw new UnauthorizedException()
            next();
        } catch (error) {
            next(error);
        }
    };
};