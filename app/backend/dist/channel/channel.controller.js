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
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const channelDto_1 = require("./dto/channelDto");
const channel_service_1 = require("./channel.service");
const protectedChannelDto_1 = require("./dto/protectedChannelDto");
let ChannelController = class ChannelController {
    constructor(channelservice) {
        this.channelservice = channelservice;
    }
    async CreateChannel(channelData, res) {
        const ret = await this.channelservice.channelCreate(channelData);
        if (typeof ret === 'string')
            return res.status(common_1.HttpStatus.OK).send(ret);
        return res.status(common_1.HttpStatus.CREATED).send('');
    }
    async updateChannel(channelData, res) {
        const ret = await this.channelservice.channelUpdate(channelData);
        if (typeof ret === 'string')
            return res.status(common_1.HttpStatus.OK).send(ret);
        return res.status(common_1.HttpStatus.CREATED).send('');
    }
    async promoteUserFromChannel(userId, channelId, res) {
        const ret = await this.channelservice.promoteMember(userId, channelId);
        if (typeof ret === 'string') {
            console.log('HERE BANNNED');
            return res.status(common_1.HttpStatus.OK).send('user is banned');
        }
        return res.status(common_1.HttpStatus.CREATED).send('');
    }
    async getUserGrade(userId, channelId) {
        return await this.channelservice.getUserGrade(userId, channelId);
    }
    async getChannelUsers(id) {
        return await this.channelservice.getChannelData(id);
    }
    async getChannelNameById(id) {
        return await this.channelservice.getChannelName(id);
    }
    async getAllChannels(id) {
        return await this.channelservice.getAllChannels(id);
    }
    async getAccessibleChannels() {
        return await this.channelservice.getAccessibleChannels();
    }
    async checkProtected(id, protectedData) {
        const protectedIsValid = await this.channelservice.checkProtectedChannel(protectedData, id);
        if (typeof protectedIsValid === 'string')
            return protectedIsValid;
        if (protectedIsValid === true)
            await this.channelservice.addUserToChannel(id, protectedData.channelName);
        return protectedIsValid;
    }
    async addToChannel(id, channelName) {
        if (channelName == 'undefined')
            throw new common_1.BadRequestException('channel was not specified');
        console.log('HERE');
        const ret = await this.channelservice.addUserToChannel(id, channelName);
        return ret;
    }
    async getChannelMessages(id, userId) {
        return await this.channelservice.getLatestMessages(id, userId);
    }
};
exports.ChannelController = ChannelController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelDto_1.channelDto, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "CreateChannel", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelDto_1.channelDto, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateChannel", null);
__decorate([
    (0, common_1.Post)('promoteuser/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('channelId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "promoteUserFromChannel", null);
__decorate([
    (0, common_1.Get)('userGrade/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getUserGrade", null);
__decorate([
    (0, common_1.Get)('channelData/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelUsers", null);
__decorate([
    (0, common_1.Get)('channelName/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelNameById", null);
__decorate([
    (0, common_1.Get)('AllChannels/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getAllChannels", null);
__decorate([
    (0, common_1.Get)('AccessibleChannels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getAccessibleChannels", null);
__decorate([
    (0, common_1.Post)('checkProtected/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, protectedChannelDto_1.protectedChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "checkProtected", null);
__decorate([
    (0, common_1.Get)('addToChannel/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "addToChannel", null);
__decorate([
    (0, common_1.Get)('loadMessages/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelMessages", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('channel'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map