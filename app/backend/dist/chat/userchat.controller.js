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
exports.chatController = void 0;
const common_1 = require("@nestjs/common");
const userchat_service_1 = require("./userchat.service");
const user_service_1 = require("../user/user.service");
const jwtGuard_1 = require("../auth/jwt/jwtGuard");
let chatController = class chatController {
    constructor(chatService, userRepository) {
        this.chatService = chatService;
        this.userRepository = userRepository;
    }
    async getMessages(req, id) {
        const user = await this.userRepository.getUserFromJwt(req.cookies['access_token']);
        if (user === null)
            console.log('todo: handle if the receiver not exist');
        return await this.chatService.loadMessage(user, id);
    }
};
exports.chatController = chatController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], chatController.prototype, "getMessages", null);
exports.chatController = chatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __metadata("design:paramtypes", [userchat_service_1.ChatGatewayService,
        user_service_1.UserService])
], chatController);
//# sourceMappingURL=userchat.controller.js.map