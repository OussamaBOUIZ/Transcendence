"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const userWinDto_1 = require("./dto/userWinDto");
const scoreSavingDto_1 = require("./dto/scoreSavingDto");
const game_service_1 = require("./game.service");
const gameModes = ["BattleRoyal", "IceLand", "TheBeat", "BrighGround"];
const waitingSockets = new Map([
    ["BattleRoyal", []],
    ["IceLand", []],
    ["TheBeat", []],
    ["BrighGround", []]
]);
let GameGateway = class GameGateway {
    constructor(gameservice) {
        this.gameservice = gameservice;
    }
    afterInit(server) {
        console.log('after init');
    }
    handleConnection(socket, ...args) {
        console.log('handle connect');
    }
    handleDisconnect(socket) {
        console.log('handle disconnect');
        gameModes.forEach((mode) => {
            waitingSockets.set(mode, waitingSockets.get(mode).filter((s) => s.id !== socket.id));
        });
    }
    onJoinGame(roomKey, socket) {
        console.log('join game');
        socket.join(roomKey);
        console.log(this.server.sockets.adapter.rooms.get(roomKey).size);
        if (this.server.sockets.adapter.rooms.get(roomKey).size == 2) {
            const socketsSet = this.server.sockets.adapter.rooms.get(roomKey);
            const socketsArr = Array.from(socketsSet);
            const sock = this.server.sockets.sockets.get(socketsArr[0]);
            sock.emit("notHost");
        }
    }
    async onGameEnd(roomKey, socket) {
        socket.leave(roomKey);
    }
    async onAchievement(gameData, socket) {
        await this.gameservice.userGameDataUpdate(gameData);
    }
    async onSaveScore(score, socket) {
        await this.gameservice.saveScore(score);
    }
    onScore(body, socket) {
        socket.to(body.roomKey).emit("scoreChanged", body.score);
    }
    onSendOppUser(body, socket) {
        socket.to(body.roomKey).emit("recieveOppUser", body.user);
    }
    onGameMatching(body, socket) {
        const sockets = waitingSockets.get(body.modeName);
        if (sockets.length >= 1) {
            const oppSocket = sockets[0];
            sockets.unshift();
            socket.emit("matched", socket.id + oppSocket.id);
            oppSocket.emit("matched", socket.id + oppSocket.id);
            console.log("socket id: ", socket.id + oppSocket.id);
        }
        else
            sockets.push(socket);
    }
    onNewMessage(body, socket) {
        socket.to(body.gameKey).emit("movePad", body);
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGame'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "onJoinGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('gameEnd'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "onGameEnd", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('achievement'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userWinDto_1.userWinDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "onAchievement", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('saveScore'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [scoreSavingDto_1.scoreStoreDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "onSaveScore", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('gameScore'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "onScore", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendOppUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "onSendOppUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("gameMatching"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "onGameMatching", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('game'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "onNewMessage", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4343, { cors: {
            origin: "http://localhost:5173",
            credentials: true
        } }),
    __metadata("design:paramtypes", [game_service_1.gameService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map