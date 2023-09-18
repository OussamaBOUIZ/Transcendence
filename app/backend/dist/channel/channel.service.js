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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channel_entity_1 = require("../databases/channel.entity");
const typeorm_2 = require("typeorm");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const message_entity_1 = require("../databases/message.entity");
const user_service_1 = require("../user/user.service");
const muted_users_entity_1 = require("../databases/muted_users.entity");
let ChannelService = class ChannelService {
    constructor(channelRepo, messageRepo, muteRepo, jwtService, userService) {
        this.channelRepo = channelRepo;
        this.messageRepo = messageRepo;
        this.muteRepo = muteRepo;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async findChannelWithMembers(channelName) {
        return await this.channelRepo.findOne({
            where: { channel_name: channelName },
            relations: {
                channelUsers: true,
                channelAdmins: true,
                channelOwners: true,
            }
        });
    }
    async findChannelBannedMembers(channelName) {
        return await this.channelRepo.findOne({
            where: { channel_name: channelName },
            relations: {
                BannedUsers: true,
            }
        });
    }
    async channelCreate(channelData) {
        const channelFound = await this.channelRepo.findOne({
            where: { channel_name: channelData.channelName },
            relations: {
                channelOwners: true,
            }
        });
        if (!channelFound) {
            const newChannel = new channel_entity_1.Channel();
            if (channelData.channelName.length === 0)
                return 'channel name must be set';
            if (channelData.channelName.length > 12)
                return 'channel name is too large';
            newChannel.channel_name = channelData.channelName;
            if (channelData.channelType.length === 0)
                return 'channel type must be set';
            newChannel.channel_type = channelData.channelType;
            if (channelData.channelType === 'protected' && channelData.channelPassword.length === 0)
                return 'password must be set';
            if (channelData.channelType === 'protected' && channelData.channelPassword.length > 16)
                return 'channel password is too large';
            if (newChannel.channel_type === 'protected')
                newChannel.channel_password = await argon.hash(channelData.channelPassword);
            const userFound = await this.userService.findUserById(channelData.channelOwner);
            newChannel.channelOwners = [userFound];
            await this.channelRepo.save(newChannel);
        }
        else
            return 'channel already created';
    }
    async channelUpdate(channelData) {
        console.log('channel data: ', channelData);
        const channelFound = await this.channelRepo.findOne({
            where: { id: channelData.channelId },
            relations: {
                channelOwners: true,
            }
        });
        if (channelData.channelName.length === 0)
            return 'channel name must be set';
        if (channelData.channelName.length > 12)
            return 'channel name is too large';
        channelFound.channel_name = channelData.channelName;
        if (channelData.channelType.length === 0)
            return 'channel type must be set';
        channelFound.channel_type = channelData.channelType;
        if (channelData.channelType === 'protected' && channelData.channelPassword.length === 0)
            return 'password must be set';
        if (channelData.channelType === 'protected' && channelData.channelPassword.length > 16)
            return 'channel password is too large';
        if (channelFound.channel_type === 'protected')
            channelFound.channel_password = await argon.hash(channelData.channelPassword);
        await this.channelRepo.save(channelFound);
    }
    async getLatestMessages(channelId, userId) {
        const user = await this.userService.findUserWithBanned(userId);
        if (user.userBannedChannels.some(channel => channel.id === channelId))
            return [];
        const latestMessages = await this.messageRepo.find({
            relations: {
                channel: true,
            },
            where: { channel: { id: channelId } },
            order: { CreatedAt: 'DESC' },
            take: 40,
            select: {
                id: true,
                message: true,
                fromUser: true,
                CreatedAt: true
            }
        });
        return latestMessages.reverse();
    }
    async kickUserFromChannel(kickUser) {
        const channelFound = await this.findChannelWithMembers(kickUser.channelName);
        const user = await this.userService.findUserById(kickUser.userId);
        if (channelFound !== null && channelFound !== undefined && channelFound.channelUsers.length !== 0
            && channelFound.channelUsers.some(user => user.id === kickUser.userId))
            channelFound.channelUsers = channelFound.channelUsers.filter((currentUser) => currentUser.id !== user.id);
        if (channelFound !== null && channelFound !== undefined && channelFound.channelAdmins.length !== 0
            && channelFound.channelAdmins.some(user => user.id === kickUser.userId))
            channelFound.channelAdmins = channelFound.channelAdmins.filter((currentUser) => currentUser.id !== user.id);
        await this.channelRepo.save(channelFound);
    }
    async banUserFromChannel(banUser) {
        const channelFound = await this.findChannelBannedMembers(banUser.channelName);
        const user = await this.userService.findUserById(banUser.userId);
        if (channelFound.BannedUsers !== null && channelFound.BannedUsers.some(user => user.id === user.id))
            return;
        channelFound.BannedUsers = channelFound.BannedUsers !== null ? [...channelFound.BannedUsers, user] : [user];
        await this.channelRepo.save(channelFound);
    }
    async promoteMember(userId, channelId) {
        const user = await this.userService.findUserById(userId);
        const channel = await this.channelRepo.findOne({
            where: { id: channelId },
            relations: {
                channelAdmins: true,
                channelOwners: true,
                channelUsers: true,
                BannedUsers: true
            },
        });
        if (channel.BannedUsers !== null && channel.BannedUsers.some(user => user.id === userId))
            return 'user is banned';
        if (channel.channelUsers !== null && channel.channelUsers.some(user => user.id === userId)) {
            channel.channelUsers = channel.channelUsers.filter((currentUser) => currentUser.id !== user.id);
            channel.channelAdmins = channel.channelAdmins !== null && channel.channelAdmins !== undefined ?
                [...channel.channelAdmins, user] : [user];
        }
        else if (channel.channelAdmins !== null && channel.channelAdmins.some(user => user.id === userId)) {
            channel.channelAdmins = channel.channelAdmins.filter((currentUser) => currentUser.id !== user.id);
            channel.channelOwners = channel.channelOwners !== null && channel.channelOwners !== undefined ?
                [...channel.channelOwners, user] : [user];
        }
        await this.channelRepo.save(channel);
    }
    async storeChannelMessage(messageData, channel) {
        const newMessage = this.messageRepo.create({ message: messageData.message });
        newMessage.channel = channel;
        newMessage.fromUser = messageData.fromUser;
        await this.messageRepo.save(newMessage);
    }
    async muteUserFromChannel(muteUser, channel) {
        const mutedUser = await this.muteRepo.findOneBy({ user_id: muteUser.userId });
        if (mutedUser)
            return 'already muted';
        const mute = new muted_users_entity_1.Muted_users();
        mute.channel = channel;
        mute.user_id = muteUser.userId;
        await this.muteRepo.save(mute);
    }
    async unmuteUser(userId) {
        const mutedUser = await this.muteRepo.findOneBy({ user_id: userId });
        await this.muteRepo.remove(mutedUser);
    }
    async getChannel(channelName) {
        return await this.channelRepo.findOneBy({ channel_name: channelName });
    }
    async getPublicChannels() {
        const type = 'public';
        const publicChannels = await this.channelRepo.find({
            where: { channel_type: type }
        });
        return publicChannels;
    }
    async getProtectedChannels() {
        const type = 'protected';
        const protectedChannels = await this.channelRepo.find({
            where: { channel_type: type }
        });
        return protectedChannels;
    }
    async getPrivateChannels() {
        const type = 'private';
        const privateChannels = await this.channelRepo.find({
            where: { channel_type: type }
        });
        return privateChannels;
    }
    async userIsBanned(channelName, userId) {
        const channel = await this.findChannelBannedMembers(channelName);
        if (channel !== null && channel.BannedUsers !== null && channel.BannedUsers.some(user => user.id === userId))
            return true;
        return false;
    }
    async userIsMuted(userId) {
        const muted = await this.muteRepo.findOneBy({ user_id: userId });
        if (muted)
            return true;
        return false;
    }
    async leaveChannel(channelName, userId) {
        const channel = await this.channelRepo.findOne({
            where: { channel_name: channelName },
            relations: {
                channelUsers: true,
                channelAdmins: true
            },
        });
        if (channel.channelAdmins.some(user => user.id === userId)) {
            const user = await this.userService.findUserById(userId);
            if (channel.channelAdmins !== null)
                channel.channelAdmins = channel.channelAdmins.filter(user => user.id !== userId);
        }
        else if (channel.channelUsers.some(user => user.id === userId)) {
            if (channel.channelUsers !== null)
                channel.channelUsers = channel.channelUsers.filter(user => user.id !== userId);
        }
        await this.channelRepo.save(channel);
    }
    async getChannelData(id) {
        const channel = await this.channelRepo.findOne({
            where: { id: id },
            relations: {
                channelAdmins: {
                    stat: true,
                },
                channelOwners: {
                    stat: true,
                },
                channelUsers: {
                    stat: true,
                },
            },
            select: {
                id: true,
                channelAdmins: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    stat: {
                        wins: true,
                        losses: true,
                    }
                },
                channelOwners: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    stat: {
                        wins: true,
                        losses: true,
                    }
                },
                channelUsers: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    stat: {
                        wins: true,
                        losses: true,
                    }
                }
            }
        });
        return channel;
    }
    async getChannelName(channelId) {
        const channel = await this.channelRepo.findOne({
            where: { id: channelId },
        });
        return channel.channel_name;
    }
    async getUserGrade(userId, channelId) {
        const channel = await this.channelRepo.findOne({
            where: { id: channelId },
            relations: {
                channelAdmins: true,
                channelUsers: true,
                channelOwners: true,
            },
        });
        if (channel.channelOwners.some(user => user.id === userId))
            return 'owner';
        else if (channel.channelAdmins.some(user => user.id === userId))
            return 'admin';
        else if (channel.channelUsers.some(user => user.id === userId))
            return 'user';
    }
    async getAllChannels(id) {
        const user = await this.userService.findUserWithChannels(id);
        const AllChannels = [...user.userRoleChannels, ...user.adminRoleChannels, ...user.ownerRoleChannels];
        return AllChannels;
    }
    async getAccessibleChannels() {
        return await this.channelRepo.find({
            where: [
                { channel_type: 'public' },
                { channel_type: 'protected' },
            ],
            select: {
                id: true,
                channel_name: true,
                channel_type: true,
            }
        });
    }
    async checkProtectedChannel(channelData, userId) {
        const user = await this.userService.findUserWithChannels(userId);
        if (user.ownerRoleChannels.some(channel => channel.channel_name === channelData.channelName))
            return 'You are already a member';
        else if (user.adminRoleChannels.some(channel => channel.channel_name === channelData.channelName))
            return 'You are already a member';
        else if (user.userRoleChannels.some(channel => channel.channel_name === channelData.channelName))
            return 'You are already a member';
        const channel = await this.channelRepo.findOne({
            where: { channel_name: channelData.channelName },
        });
        const checkPassword = await argon.verify(channel.channel_password, channelData.channelPassword);
        if (!checkPassword)
            return false;
        return true;
    }
    async addUserToChannel(userId, channelName) {
        const user = await this.userService.findUserWithChannels(userId);
        if (user.ownerRoleChannels.some(channel => channel.channel_name === channelName))
            return 'You are already a member';
        else if (user.adminRoleChannels.some(channel => channel.channel_name === channelName))
            return 'You are already a member';
        else if (user.userRoleChannels.some(channel => channel.channel_name === channelName))
            return 'You are already a member';
        const channel = await this.channelRepo.findOne({
            where: { channel_name: channelName },
            relations: {
                channelUsers: true,
            },
        });
        channel.channelUsers = channel.channelUsers !== null ? [...channel.channelUsers, user] : [user];
        await this.channelRepo.save(channel);
        return null;
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.Channel)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(2, (0, typeorm_1.InjectRepository)(muted_users_entity_1.Muted_users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        user_service_1.UserService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map