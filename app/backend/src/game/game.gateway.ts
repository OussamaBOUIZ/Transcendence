import {
	ConnectedSocket,
    MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway, 
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { userWinDto } from "./dto/userWinDto";
import { scoreStoreDto } from "./dto/scoreSavingDto";
import { gameService } from "./game.service";
import { UserService } from "src/user/user.service";

interface User {
	user: any;
	socket: Socket;
}

const gameModes: string[] = ["BattleRoyal", "BlazingPong", "ArcticPong", "RetroPong"];

const waitingUsers = new Map<String, User[]>([
    ["BattleRoyal", []],
    ["BlazingPong", []],
    ["ArcticPong", []],
    ["RetroPong", []]
]);

function cleanWaitingSockets (socket: Socket) {
	gameModes.forEach((mode: string) => {
		waitingUsers?.set(mode, 
			waitingUsers.get(mode)?.filter(
				(u: User) => u.socket.id !== socket.id)
			);
	});
}

async function updateStatus(userService: UserService, userId: number) {
	const user = await userService.findUserById(userId);
	user.status = 'In A Game';
	await userService.saveUser(user);
}

@WebSocketGateway(4343, {cors: {
	origin: "http://localhost:5173",
	credentials: true
}})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private readonly gameservice: gameService
		, private readonly userService: UserService) {}

    afterInit(server: any) {
    }

    handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    }

    handleDisconnect(@ConnectedSocket() socket: Socket) {

		for (const [key, value] of this.server.sockets.adapter.rooms) {
			if (key.includes(socket.id) && value.size > 0) {
				this.server.to(key).emit("leaveGame")
			}
		}

		cleanWaitingSockets(socket);
    }

	@SubscribeMessage('waiting')
	onWaiting(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		if (this.server.sockets.adapter.rooms.get(roomKey)?.size == 2) {
			this.server.to(roomKey).emit("startGame");
		}
	}

	@SubscribeMessage('sendUser')
	onSendUser(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		socket.to(data.roomKey).emit("recvOppUser", data.user)
	}

	@SubscribeMessage('joinGame')
	onJoinGame(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		if (!(this.server.sockets.adapter.rooms.get(roomKey)?.size > 2))
			socket.join(roomKey);

		if (this.server.sockets.adapter.rooms.get(roomKey)?.size == 2) {
			const socketsSet: Set<string> = this.server.sockets.adapter.rooms.get(roomKey);
			const socketsArr: Array<string> = Array.from(socketsSet);
			const sock: Socket = this.server.sockets.sockets.get(socketsArr[0]);

			sock.emit("notHost");
		}
	}
  
	@SubscribeMessage('gameEnd')
	async onGameEnd(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {

		socket.leave(roomKey);
		cleanWaitingSockets(socket);
	}

	@SubscribeMessage('quitGame')
	async onQuitGame(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		socket.to(roomKey).emit("leaveGame");

		socket.leave(roomKey);
		cleanWaitingSockets(socket);
	}

	@SubscribeMessage('achievement')
	async onAchievement(@MessageBody() gameData: userWinDto, @ConnectedSocket() socket: Socket) {
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
	async onGameMatching(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		const users: User[] =  waitingUsers.get(body.modeName);
		const user = await this.userService.findUserById(body.user.id);


		if (user.status != "In A Game" && !users?.find((user: User) => user.user.id == body.user.id )) {
			if (users.length >= 1) {
				const oppUser: User = users[0];
				
				setTimeout( async () => {

					if (socket.connected && oppUser.socket.connected) {
						socket.emit("matched", {roomKey: socket.id + oppUser.socket.id, user: oppUser.user});
						oppUser.socket.emit("matched", {roomKey: socket.id + oppUser.socket.id, user: body.user});
						users.unshift();
					}
				}, 1000)
			} else
				users.push({user: body.user, socket});
		}
	}

    @SubscribeMessage('game')
	async onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.gameKey).emit("movePad", body);

		updateStatus(this.userService, body.userId);
	}
}
