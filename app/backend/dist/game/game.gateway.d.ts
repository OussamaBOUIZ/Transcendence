import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { userWinDto } from "./dto/userWinDto";
import { scoreStoreDto } from "./dto/scoreSavingDto";
import { gameService } from "./game.service";
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly gameservice;
    server: Server;
    constructor(gameservice: gameService);
    afterInit(server: any): void;
    handleConnection(socket: Socket, ...args: any[]): void;
    handleDisconnect(socket: Socket): void;
    onJoinGame(roomKey: string, socket: Socket): void;
    onGameEnd(roomKey: string, socket: Socket): Promise<void>;
    onAchievement(gameData: userWinDto, socket: Socket): Promise<void>;
    onSaveScore(score: scoreStoreDto, socket: Socket): Promise<void>;
    onScore(body: any, socket: Socket): void;
    onChangePersentage(body: any, socket: Socket): void;
    onSendEffect(body: any, socket: Socket): void;
    onGameMatching(body: any, socket: Socket): void;
    onNewMessage(body: any, socket: Socket): void;
}
