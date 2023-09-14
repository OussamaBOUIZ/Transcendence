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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const user_service_1 = require("./user.service");
const fs_1 = require("fs");
const path = require("path");
const jwtGuard_1 = require("../auth/jwt/jwtGuard");
const jwt_1 = require("@nestjs/jwt");
const BlockedTokenList_service_1 = require("../databases/BlockedTokenList/BlockedTokenList.service");
const stats_dto_1 = require("./dto/stats-dto");
const game_history_dto_1 = require("./game-history-dto/game-history-dto");
const search_dto_1 = require("./game-history-dto/search-dto");
const multer_1 = require("multer");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const userDataDto_1 = require("./dto/userDataDto");
const filter_1 = require("../Filter/filter");
const DirUpload = './uploads/usersImage/';
const multerConfig = () => ({
    storage: (0, multer_1.diskStorage)({
        destination: DirUpload,
        filename: async (req, file, cb) => {
            const supportedExt = ['.png', '.jpeg', '.jpg'];
            console.log('interceptor');
            if (isNaN(parseInt(req.params['userId'], 10)))
                return cb(new common_1.HttpException('userId Must be a number', common_1.HttpStatus.BAD_REQUEST), false);
            if (!supportedExt.includes((0, path_1.extname)(file.originalname)))
                return cb(new common_1.HttpException(`Unsupported file type ${file.originalname.ext}`, common_1.HttpStatus.BAD_REQUEST), false);
            const extention = path.parse(file.originalname).ext;
            const filename = req.params['userId'] + extention;
            console.log('filname1');
            console.log(filename);
            try {
                await fs_1.promises.access(DirUpload + filename);
                cb(new common_1.HttpException(`Wrong Http Method`, common_1.HttpStatus.METHOD_NOT_ALLOWED));
            }
            catch (e) {
                console.log('filename', filename);
                cb(null, filename);
            }
        }
    })
});
const updateMuliterConfig = () => ({
    storage: (0, multer_1.diskStorage)({
        destination: DirUpload,
        filename: async (req, file, cb) => {
            const supportedExt = ['.png', '.jpeg', '.jpg'];
            if (isNaN(parseInt(req.params['userId'], 10)))
                return cb(new common_1.HttpException('userId Must be a number', common_1.HttpStatus.BAD_REQUEST), false);
            if (!supportedExt.includes((0, path_1.extname)(file.originalname)))
                return cb(new common_1.HttpException(`Unsupported file type ${file.originalname.ext}`, common_1.HttpStatus.BAD_REQUEST), false);
            const extention = path.parse(file.originalname).ext;
            const filename = req.params['userId'] + extention;
            cb(null, filename);
        }
    })
});
let UserController = class UserController {
    constructor(userService, jwt, BlockedTokenService) {
        this.userService = userService;
        this.jwt = jwt;
        this.BlockedTokenService = BlockedTokenService;
    }
    async updateUserStatus(req, body) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        if (!user)
            throw new common_1.NotFoundException('user not exist');
        user.status = body.status;
        await this.userService.saveUser(user);
    }
    async getUserData(req) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        if (!user)
            throw new common_1.NotFoundException('User not Found');
        return await this.getUserDetails(user.id);
    }
    async getOnlineUsers(req) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        return await this.userService.onlineUsers(user.id);
    }
    async uploadImage(id, image, res) {
        await this.userService.saveUserAvatarPath(id, image.path);
        return res.status(common_1.HttpStatus.CREATED).send('Avatar Uploaded');
    }
    async updateAvatar(id, image, res) {
        const user = await this.userService.saveUserAvatarPath(id, image.path);
        if (!user) {
            await (0, promises_1.unlink)(image.path);
            throw new common_1.NotFoundException('The User Not Found');
        }
        return res.status(common_1.HttpStatus.CREATED).send('Avatar Uploaded');
    }
    async deleteUser(userId) {
        await this.userService.deleteUserFromDB(userId);
        return 'success';
    }
    async getAchievements(id) {
        return await this.userService.getAchievement(id);
    }
    async getGameLeaders() {
        return this.userService.getLeaderBoard();
    }
    async getUserById(id) {
        return await this.userService.findUserById(id);
    }
    async getBlockedUser(userId, req) {
        const user = await this.userService.findUserById(userId);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        const blockedUsers = await this.userService.getBlockedUsers(user.id);
        const trans = blockedUsers.blocked_users.map(user => ({ id: user.id }));
        return trans;
    }
    async blockUser(userId, req, res) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        const ret = await this.userService.blockUser(userId, user.email);
        if (typeof ret === 'string')
            return res.status(common_1.HttpStatus.OK).send(ret);
        return res.status(common_1.HttpStatus.OK).send('');
    }
    async getAvatarById(id) {
        const user = await this.userService.findUserById(id);
        if (!user)
            throw new common_1.HttpException('User Not Found !!', common_1.HttpStatus.NOT_FOUND);
        const imagePath = user.avatar;
        try {
            await (0, promises_1.access)(imagePath, fs_1.promises.constants.R_OK);
            const fileContent = (0, fs_1.createReadStream)(imagePath);
            return new common_1.StreamableFile(fileContent);
        }
        catch (e) {
            const filename = 'default.jpg';
            const defaultPath = path.join(process.cwd(), 'uploads/usersImage', filename);
            const fileContent = (0, fs_1.createReadStream)(defaultPath);
            return new common_1.StreamableFile(fileContent);
        }
    }
    async getStatsById(id) {
        return await this.userService.getStatsById(id);
    }
    async getLastThree(id) {
        return await this.userService.getLastThreeAchievements(id);
    }
    async getAchievementImage(id) {
        const filename = id % 14 !== 0 ? (id % 14) + '.jpg' : 14 + '.jpg';
        const imagePath = path.join(process.cwd(), 'src/achievementImages', filename);
        const fileContent = (0, fs_1.createReadStream)(imagePath);
        return new common_1.StreamableFile(fileContent);
    }
    async getOnlineFriends(id) {
        return await this.userService.onlineFriends(id);
    }
    async addFriend(id, friendId, res) {
        await this.userService.addFriend(id, friendId);
        return res.status(201).send(`user has ${friendId} as a friend now`);
    }
    async getAllFriends(id) {
        return await this.userService.AllFriends(id);
    }
    async getFriendLastGame(friendId, userId) {
        return await this.userService.getFriendLastGame(friendId, userId);
    }
    async getGameHistory(userId) {
        return await this.userService.getMatchHistory(userId);
    }
    async turnOn2fa(id, req, res) {
        const user = await this.userService.findUserById(id);
        const data2fa = this.userService.otpsetup(user);
        console.log('HERE HERE HERE1');
        user.two_factor_secret = data2fa.secret;
        user.otpPathUrl = data2fa.otpPathUrl;
        user.is_two_factor = true;
        await this.userService.saveUser(user);
        return res.status(200).send('two factor was turned on');
    }
    async turnOff2fa(id, req, res) {
        const user = await this.userService.findUserById(id);
        const isCodeValid = this.userService.isUserAuthValid(req.body.token, user);
        console.log(isCodeValid);
        if (!isCodeValid)
            return res.status(200).send('two factor token is invalid');
        user.two_factor_secret = null;
        user.otpPathUrl = null;
        user.is_two_factor = false;
        await this.userService.saveUser(user);
        return res.status(200).send('');
    }
    async isTurned2fa(id, req, res) {
        const user = await this.userService.findUserById(id);
        if (await this.userService.userHasAuth(user) === true)
            return res.status(200).send(true);
        else
            return res.status(200).send(false);
    }
    async login2fa(req, res) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        const isCodeValid = this.userService.isUserAuthValid(req.body.token, user);
        console.log(isCodeValid);
        if (!isCodeValid)
            return res.status(400).send('two factor token is invalid');
        return res.status(200).send('correct two factor token');
    }
    async setUserNames(userData, req, res, id) {
        console.log('data is: ', userData);
        const user = await this.userService.findUserById(id);
        user.firstname = userData.firstname;
        user.lastname = userData.lastname;
        try {
            user.username = userData.username;
            await this.userService.saveUser(user);
        }
        catch (_a) {
            return res.status(200).send('nickname already exists');
        }
        return res.status(200).send('');
    }
    async postUsername(userData, req, res, id) {
        const user = await this.userService.findUserById(id);
        if (userData.username.length === 0) {
            user.firstname = userData.firstname;
            user.lastname = userData.lastname;
            await this.userService.saveUser(user);
        }
        else {
            try {
                user.username = userData.username;
                await this.userService.saveUser(user);
            }
            catch (error) {
                return res.status(400).send('nickname is already used');
            }
        }
        return res.status(201).send('data was set succesfully');
    }
    async isFirstLog(req, res) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        return user.firstLog;
    }
    async logout(id, req, res) {
        const token = req.cookies['access_token'];
        const user = await this.userService.findUserById(id);
        const payload = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
        const till = payload.iat + 180;
        await this.BlockedTokenService.blacklistToken(token, till * 1000);
        user.status = 'Offline';
        await this.userService.saveUser(user);
        return res.redirect('/');
    }
    async addUserStat(statDto, req) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        await this.userService.addUserStat(statDto, user);
    }
    async createGameHistory(gameHistoryDto) {
        console.log(gameHistoryDto);
        await this.userService.addGameHistory(gameHistoryDto);
        return {
            Message: "The content is created"
        };
    }
    async searchForUser(dto) {
        const { username } = dto;
        const user = await this.userService.searchUser(username);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async getUserDetails(id) {
        return this.userService.getUserDetails(id);
    }
    async getUserProfile(username) {
        const user = await this.userService.getUserProfile(username);
        return user;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Put)('updateStatus'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userDataDto_1.statusDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Get)('online/users'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOnlineUsers", null);
__decorate([
    (0, common_1.Post)('/:userId/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multerConfig())),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        fileIsRequired: false,
    }))),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Put)('/:userId/avatar/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', updateMuliterConfig())),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        fileIsRequired: true
    }))),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('achievements/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAchievements", null);
__decorate([
    (0, common_1.Get)('leaders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getGameLeaders", null);
__decorate([
    (0, common_1.Get)(':id/data'),
    (0, common_1.UseFilters)(filter_1.ViewAuthFilter),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('blockedUsers/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getBlockedUser", null);
__decorate([
    (0, common_1.Post)('block/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Get)('avatar/:id'),
    (0, common_1.Header)('Content-Type', 'image/jpg'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAvatarById", null);
__decorate([
    (0, common_1.Get)('stats/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getStatsById", null);
__decorate([
    (0, common_1.Get)('achievement/firstThree/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLastThree", null);
__decorate([
    (0, common_1.Get)('achievement/image/:id'),
    (0, common_1.Header)('Content-Type', 'image/jpg'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAchievementImage", null);
__decorate([
    (0, common_1.Get)('onlinefriends/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOnlineFriends", null);
__decorate([
    (0, common_1.Post)('addfriend/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('friendId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Get)('allfriends/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllFriends", null);
__decorate([
    (0, common_1.Get)('friendLastGame/:friendId'),
    __param(0, (0, common_1.Param)('friendId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriendLastGame", null);
__decorate([
    (0, common_1.Get)('game/history/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getGameHistory", null);
__decorate([
    (0, common_1.Get)('2fa/turn-on/:id'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "turnOn2fa", null);
__decorate([
    (0, common_1.Post)('2fa/turn-off/:id'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "turnOff2fa", null);
__decorate([
    (0, common_1.Get)('2fa/isTurnedOn/:id'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isTurned2fa", null);
__decorate([
    (0, common_1.Post)('2fa/login/'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login2fa", null);
__decorate([
    (0, common_1.Put)('setUserNames/:id'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userDataDto_1.userNamesDto, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setUserNames", null);
__decorate([
    (0, common_1.Post)('setUserData/:id'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userDataDto_1.userDataDto, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postUsername", null);
__decorate([
    (0, common_1.Get)('isFirstLog'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isFirstLog", null);
__decorate([
    (0, common_1.Post)('logout/:id'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Patch)('stat/add'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stats_dto_1.StatsDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUserStat", null);
__decorate([
    (0, common_1.Post)('gameHistory/add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_history_dto_1.GameHistoryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createGameHistory", null);
__decorate([
    (0, common_1.Get)('search/user'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.searchDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchForUser", null);
__decorate([
    (0, common_1.Get)('user/details/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDetails", null);
__decorate([
    (0, common_1.Get)('user/profile/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwtGuard_1.JwtGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        BlockedTokenList_service_1.BlockedTokenlistService])
], UserController);
//# sourceMappingURL=user.controller.js.map