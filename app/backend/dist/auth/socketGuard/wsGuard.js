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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const config_1 = require("@nestjs/config");
let WsGuard = class WsGuard {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        console.log('CanActivate');
    }
    canActivate(context) {
        var _a, _b;
        const client = context.switchToWs().getClient();
        let token = (_b = (_a = client.handshake) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization.split(' ')[1];
        try {
            client.data.user = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET')
            });
            return true;
        }
        catch (e) {
            console.log(`not authorized\n${e}`);
            throw new websockets_1.WsException(e.message);
        }
    }
};
exports.WsGuard = WsGuard;
exports.WsGuard = WsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, config_1.ConfigService])
], WsGuard);
//# sourceMappingURL=wsGuard.js.map