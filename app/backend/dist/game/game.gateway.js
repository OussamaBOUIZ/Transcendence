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
const waitingUsers = new Map([
    ["BattleRoyal", []],
    ["BlazingPong", []],
    ["ArcticPong", []],
    ["RetroPong", []]
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
            waitingUsers.set(mode, waitingUsers.get(mode).filter((u) => u.socket.id !== socket.id));
        });
    }
    onJoinGame(roomKey, socket) {
        console.log('join game');
        socket.join(roomKey);
        console.log(this.server.sockets.adapter.rooms.get(roomKey).size);
    }
    async onGameEnd(roomKey, socket) {
        socket.to(roomKey).emit("leaveGame");
        console.log("leave game");
        socket.leave(roomKey);
    }
    async onAchievement(gameData, socket) {
        console.log('here achievement: ', gameData);
        await this.gameservice.userGameDataUpdate(gameData);
        await this.gameservice.addLoserStat(gameData.opponentId);
    }
    async onSaveScore(score, socket) {
        await this.gameservice.saveScore(score);
    }
    onScore(body, socket) {
        socket.to(body.roomKey).emit("scoreChanged", body.score);
    }
    onChangePersentage(body, socket) {
        socket.to(body.roomKey).emit("recvPersentage", body.persentage);
    }
    onSendEffect(body, socket) {
        socket.to(body.roomKey).emit("recieveEffect", body.effect);
    }
    onGameMatching(body, socket) {
        const users = waitingUsers.get(body.modeName);
        if (!users.find((user) => user.user.id == body.user.id)) {
            if (users.length >= 1) {
                const oppUser = users[0];
                users.unshift();
                setTimeout(() => {
                    socket.emit("matched", { roomKey: socket.id + oppUser.socket.id, user: oppUser.user });
                    oppUser.socket.emit("matched", { roomKey: socket.id + oppUser.socket.id, user: body.user });
                }, 1000);
                console.log("socket id: ", socket.id + oppUser.socket.id);
            }
            else
                users.push({ user: body.user, socket });
        }
    }
    onNewMessage(body, socket) {
        var _a;
        socket.to(body.gameKey).emit("movePad", body);
        if (((_a = this.server.sockets.adapter.rooms.get(body.gameKey)) === null || _a === void 0 ? void 0 : _a.size) == 2) {
            const socketsSet = this.server.sockets.adapter.rooms.get(body.gameKey);
            const socketsArr = Array.from(socketsSet);
            const sock = this.server.sockets.sockets.get(socketsArr[0]);
            sock.emit("notHost");
        }
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
    (0, websockets_1.SubscribeMessage)('changePersentage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "onChangePersentage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendEffect'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "onSendEffect", null);
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