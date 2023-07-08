import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
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
            client.data.user = this.jwtService.verify(token, {
                secret : this.configService.get('JWT_SECRET')
            })
            return true
        } catch (e) {
            console.log(`not authorized\n${e}`)
            throw new WsException(e.message);
        }
   }
}