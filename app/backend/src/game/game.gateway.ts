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
const gameModes: string[] = ["BattleRoyal", "BlazingPong", "ArcticPong", "RetroPong"]

interface User {
	user: any;
	socket: Socket;
}

const waitingUsers = new Map<String, User[]>([
    ["BattleRoyal", []],
    ["BlazingPong", []],
    ["ArcticPong", []],
    ["RetroPong", []]
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
		});
    }

	@SubscribeMessage('joinGame')
	onJoinGame(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		console.log('join game');
		
		socket.join(roomKey); 

		console.log(this.server.sockets.adapter.rooms.get(roomKey).size);

		// if (this.server.sockets.adapter.rooms.get(roomKey).size == 2) {
		// 	const socketsSet: Set<string> = this.server.sockets.adapter.rooms.get(roomKey);
		// 	const socketsArr: Array<string> = Array.from(socketsSet);
		// 	const sock: Socket = this.server.sockets.sockets.get(socketsArr[0]);

		// 	sock.emit("notHost", "This client is not the host", (error) => {
		// 		if (error === 'error') {
		// 			console.error('Emit failed');
		// 		} else {
		// 			console.log('Emit successful');
		// 		}}
		// 	)
		// 	console.log("Heeeeeeeeeeeeeeeere");
		// 	// }
		// 	// catch (e)
		// 	// {
		// 	// 	console.log('error is: ', e);
		// 	// }
		// 	// console.log('HERE AFTER');
		// }
	}

	@SubscribeMessage('gameEnd')
	async onGameEnd(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		socket.to(roomKey).emit("leaveGame");
		console.log("leave game");

		socket.leave(roomKey);
	}

	@SubscribeMessage('achievement')
	async onAchievement(@MessageBody() gameData: userWinDto, @ConnectedSocket() socket: Socket) {
		console.log('here achievement: ', gameData)
		await this.gameservice.userGameDataUpdate(gameData);
		await this.gameservice.addLoserStat(gameData.opponentId)
	}
	

	@SubscribeMessage('saveScore') 
	async onSaveScore(@MessageBody() score: scoreStoreDto, @ConnectedSocket() socket: Socket) {
		await this.gameservice.saveScore(score);
	}

	@SubscribeMessage('gameScore')
	onScore(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.roomKey).emit("scoreChanged", body.score);
	}

	@SubscribeMessage('changePersentage')
	onChangePersentage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.roomKey).emit("recvPersentage", body.persentage);
	}


	@SubscribeMessage('sendEffect')
	onSendEffect(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.roomKey).emit("recieveEffect", body.effect);
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

		if (this.server.sockets.adapter.rooms.get(body.gameKey)?.size == 2) {
			const socketsSet: Set<string> = this.server.sockets.adapter.rooms.get(body.gameKey);
			const socketsArr: Array<string> = Array.from(socketsSet);
			const sock: Socket = this.server.sockets.sockets.get(socketsArr[0]);

			sock.emit("notHost");
		}
	}
}
