import {Socket} from 'socket.io';
import {ChatGatewayService} from "./userchat.service";
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
            const {authorization} = client.handshake.headers;
            console.log('authorization' , authorization)
            client.data.user = await userService.getUserFromJwt(authorization);
            if (client.data.user == null)
                throw new UnauthorizedException()
            next();
        } catch (error) {
            next(error);
        }
    };
};