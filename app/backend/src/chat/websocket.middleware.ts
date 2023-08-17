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
            
            console.log('authorization' , auth.token)
            client.data.user = await userService.getUserFromJwt(auth.token);
            if (client.data.user == null)
                throw new UnauthorizedException()
            next();
        } catch (error) {
            next(error);
        }
    };
};