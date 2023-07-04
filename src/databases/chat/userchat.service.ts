import {Injectable, Logger} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class ChatGatewayService {

    constructor(private readonly jwt: JwtService,
                private readonly configService: ConfigService
    ) {
    }

    private logger = new Logger('userchat')

    returnMessage(data: any) {
        this.logger.log(`handleMessage`)
        this.logger.log(data)
    }

    isValidAuthHeader(authorization: string) {
        const token: string = authorization.split(' ')[1];
        return this.jwt.verify(token, {
            secret: this.configService.get('JWT_SECRET')
        });
    }

    getUser(authorization: string) {
        const token: string = authorization.split(' ')[1];
        return this.jwt.verify(token, {
            secret: this.configService.get('JWT_SECRET')
        });

    }
}