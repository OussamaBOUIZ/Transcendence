import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Socket} from "socket.io";
import {WsException} from "@nestjs/websockets";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class WsGuard implements CanActivate {
    constructor(private jwtService: JwtService, private  configService: ConfigService) {
        console.log('CanActivate')
    }

    canActivate(context: ExecutionContext): boolean | any | Promise<boolean> {
        const client = context.switchToWs().getClient()
        let token = client.handshake?.headers?.authorization.split(' ')[1]

        try {
            console.log(token)
            let decodedToken = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET')
            })
            console.log(decodedToken)
            return true
        } catch (e) {
            console.log(`not authorized\n${e}`)
            throw new WsException(e.message);
        }
   }
}