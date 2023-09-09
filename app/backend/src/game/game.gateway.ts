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
import { subscribe } from "diagnostics_channel";

const gameModes: string[] = ["BattleRoyal", "IceLand", "TheBeat", "BrighGround"]

const waitingSockets = new Map<String, Socket[]>([
    ["BattleRoyal", []],
    ["IceLand", []],
    ["TheBeat", []],
    ["BrighGround", []]
]);

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
    }

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log('handle disconnect');

		gameModes.forEach((mode: string) => {
			waitingSockets.set(mode, 
				waitingSockets.get(mode).filter(
					(s: Socket) => s.id !== socket.id)
				);
		})

    }

	@SubscribeMessage('joinGame')
	onJoinGame(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		console.log('join game');
		
		socket.join(roomKey);

		console.log(this.server.sockets.adapter.rooms.get(roomKey).size);

		if (this.server.sockets.adapter.rooms.get(roomKey).size == 2) {
			// socket.emit("notHost");

			const socketsSet: Set<string> = this.server.sockets.adapter.rooms.get(roomKey);
			const socketsArr: Array<string> = Array.from(socketsSet);
			const sock: Socket = this.server.sockets.sockets.get(socketsArr[0]);

			sock.emit("notHost");
		}
	}

	@SubscribeMessage('gameEnd')
	onGameEnd(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		console.log('leave game');
		
		socket.leave(roomKey);
	}

	@SubscribeMessage("gameMatching")
	onGameMatching(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {

		const sockets: Socket[] = waitingSockets.get(body.modeName);

		console.log(sockets);

		if (sockets.length >= 1) {
			const oppSocket: Socket = sockets[0];
			sockets.unshift();
			socket.emit("matched", socket.id + oppSocket.id);
			oppSocket.emit("matched", socket.id + oppSocket.id);

			console.log("socket id: ", socket.id + oppSocket.id);
		} else {
			sockets.push(socket);
		}
	}

    @SubscribeMessage('game')
	onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.gameKey).emit("movePad", body);
	}
}
