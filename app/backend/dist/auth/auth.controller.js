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
exports.AuthController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleguard_1 = require("./googleapi/googleguard");
const auth_service_1 = require("./auth.service");
const jwtGuard_1 = require("./jwt/jwtGuard");
const _42guard_1 = require("./42api/42guard");
const mailer_service_1 = require("./MailService/mailer.service");
const qrcode_1 = require("qrcode");
const user_service_1 = require("../user/user.service");
const tokenFilter_1 = require("./Filter/tokenFilter");
let AuthController = class AuthController {
    constructor(configService, httpServer, authService, userService, mailTemp) {
        this.configService = configService;
        this.httpServer = httpServer;
        this.authService = authService;
        this.userService = userService;
        this.mailTemp = mailTemp;
    }
    googleLogin() { }
    async googleRedirect(googlereq, res) {
        const token = await this.authService.apisignin(googlereq.user);
        this.authService.setResCookie(res, token);
        const user = await this.userService.findUserByEmail(googlereq.user.email);
        const userHasAuth = await this.userService.userHasAuth(user);
        if (userHasAuth === true)
            return res.redirect('http://localhost:5173/auth');
        if (user.firstLog === true)
            return res.redirect('http://localhost:5173/info');
        return res.redirect('http://localhost:5173/');
    }
    fortyTwoLogin() {
    }
    async fortyTwoRedirect(fortyTworeq, res) {
        const token = await this.authService.apisignin(fortyTworeq.user);
        if (!token)
            return res.redirect('http://localhost:5173/');
        this.authService.setResCookie(res, token);
        const user = await this.userService.findUserByEmail(fortyTworeq.user.email);
        const userHasAuth = await this.userService.userHasAuth(user);
        if (userHasAuth === true)
            return res.redirect('http://localhost:5173/auth');
        if (user.firstLog === true)
            return res.redirect('http://localhost:5173/info');
        return res.redirect('http://localhost:5173/');
    }
    async getQrCode(req, res) {
        console.log('qrcode');
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        const path = await (0, qrcode_1.toDataURL)(user.otpPathUrl);
        return res.status(200).send(path);
    }
    getTokenValidity(req, res) {
        return res.send(true);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(googleguard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(googleguard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleRedirect", null);
__decorate([
    (0, common_1.Get)('42'),
    (0, common_1.UseGuards)(_42guard_1.FortyTwoGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "fortyTwoLogin", null);
__decorate([
    (0, common_1.Get)('42api'),
    (0, common_1.UseGuards)(_42guard_1.FortyTwoGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "fortyTwoRedirect", null);
__decorate([
    (0, common_1.Get)('qrcode'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getQrCode", null);
__decorate([
    (0, common_1.Get)('tokenValidity'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    (0, common_1.UseFilters)(tokenFilter_1.tokenValidity),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getTokenValidity", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService,
        auth_service_1.AuthService,
        user_service_1.UserService,
        mailer_service_1.MailTemplate])
], AuthController);
//# sourceMappingURL=auth.controller.js.map