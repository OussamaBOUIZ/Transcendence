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
import { userWinDto } from "./dto/userWinDto";
import { scoreStoreDto } from "./dto/scoreSavingDto";
import { gameService } from "./game.service";

const gameModes: string[] = ["BattleRoyal", "IceLand", "TheBeat", "BrighGround"]

interface User {
	user: any;
	socket: Socket;
}

const waitingUsers = new Map<String, User[]>([
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

	constructor(private readonly gameservice: gameService) {}

    afterInit(server: any) {
        console.log('after init');
    }

    handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
        console.log('handle connect');
    }

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log('handle disconnect');

		gameModes.forEach((mode: string) => {
			waitingUsers.set(mode, 
				waitingUsers.get(mode).filter(
					(u: User) => u.socket.id !== socket.id)
				);
		})

    }

	@SubscribeMessage('joinGame')
	onJoinGame(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		console.log('join game');
		
		socket.join(roomKey);

		console.log(this.server.sockets.adapter.rooms.get(roomKey).size);

		if (this.server.sockets.adapter.rooms.get(roomKey).size == 2) {
			const socketsSet: Set<string> = this.server.sockets.adapter.rooms.get(roomKey);
			const socketsArr: Array<string> = Array.from(socketsSet);
			const sock: Socket = this.server.sockets.sockets.get(socketsArr[0]);

			sock.emit("notHost");
		}
	}

	@SubscribeMessage('gameEnd')
	async onGameEnd(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		socket.leave(roomKey);
		console.log("leave game");
	}

	@SubscribeMessage('achievement')
	async onAchievement(@MessageBody() gameData: userWinDto, @ConnectedSocket() socket: Socket) {
		await this.gameservice.userGameDataUpdate(gameData);
	}
	

	@SubscribeMessage('saveScore')
	async onSaveScore(@MessageBody() score: scoreStoreDto, @ConnectedSocket() socket: Socket) {
		await this.gameservice.saveScore(score);
	}

	@SubscribeMessage('gameScore')
	onScore(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.roomKey).emit("scoreChanged", body.score);
	}

	@SubscribeMessage("gameMatching")
	onGameMatching(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		const users: User[] =  waitingUsers.get(body.modeName);

		if (users.length >= 1) {
			const oppUser: User = users[0];
			users.unshift();

			socket.emit("matched", {roomKey: socket.id + oppUser.socket.id, user: oppUser.user});
			oppUser.socket.emit("matched", {roomKey: socket.id + oppUser.socket.id, user: body.user});

			console.log("socket id: ", socket.id + oppUser.socket.id);
		} else
			users.push({user: body.user, socket});
	}

    @SubscribeMessage('game')
	onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.gameKey).emit("movePad", body);
	}
}
