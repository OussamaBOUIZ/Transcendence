import {
	ConnectedSocket,
    MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway, 
	WebSocketServer,
	WsException,
	
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { Game } from 'src/databases/game.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { brotliDecompressSync } from "zlib";
import { log } from "console";


interface players {
	host: any;
	guest: any;
}

@WebSocketGateway(4343, {cors: {
	origin: "http://localhost:5173",
	credentials: true
}})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

    afterInit(server: any) {
        console.log('after init');
    }

    handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
        console.log('handle connect');
		socket.join("room");

		console.log(this.server.sockets.adapter.rooms.get("room").size);

		if (this.server.sockets.adapter.rooms.get("room").size == 2) {
			socket.emit("notHost", "host")
		}
    }

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log('handle disconnect');
		socket.leave("room");
    }

    @SubscribeMessage('game')
	onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {

        socket.broadcast.emit("movePad", body);
	}
}
