import { Socket } from 'socket.io';
import { UserService } from "../user/user.service";
type SocketIOMiddleWare = {
    (client: Socket, next: (err?: Error) => void): any;
};
export declare const SocketAuthMiddleware: (userService: UserService) => SocketIOMiddleWare;
export {};
