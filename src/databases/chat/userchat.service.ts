import { Injectable, Logger } from "@nestjs/common";
import { WebSocketServer } from "@nestjs/websockets";


@Injectable()
export class ChatGatewayService {

    private logger = new Logger('userchat')
    returnMessage(data: any) {
        this.logger.log(`handleMessage`)
        this.logger.log(data)
    }

}