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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../databases/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const stats_entity_1 = require("../databases/stats.entity");
const otplib_1 = require("otplib");
const game_entity_1 = require("../databases/game.entity");
let UserService = class UserService {
    constructor(statsRepo, userRepo, achieveRepo, gameRepo, jwtService) {
        this.statsRepo = statsRepo;
        this.userRepo = userRepo;
        this.achieveRepo = achieveRepo;
        this.gameRepo = gameRepo;
        this.jwtService = jwtService;
    }
    async saveUserAvatarPath(userId, pathAvatar) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            return null;
        user.avatar = pathAvatar;
        return await this.userRepo.save(user);
    }
    async blockUser(userId, user_email) {
        const user = await this.userRepo.findOne({
            relations: {
                blocked_users: true
            },
            where: {
                email: user_email
            }
        });
        const blockedUser = await this.userRepo.findOne({
            where: { id: userId }
        });
        if (user.blocked_users.some((user) => user.id === blockedUser.id))
            return 'user is already blocked';
        console.log('b user', user.blocked_users);
        console.log('b user', user);
        if (!user.blocked_users)
            user.blocked_users = [];
        user.blocked_users = [...user.blocked_users, blockedUser];
        await this.userRepo.save(user);
    }
    async onlineUsers(userid) {
        const user = await this.userRepo.find({
            where: {
                id: (0, typeorm_1.Not)(userid),
                status: 'Online'
            },
            select: {
                id: true,
                status: true,
                username: true,
            }
        });
        return user;
    }
    async saveUser(user) {
        await this.userRepo.save(user);
    }
    async saveStat(stat) {
        await this.statsRepo.save(stat);
    }
    async findUserByEmail(email) {
        return await this.userRepo.findOneBy({ email: email });
    }
    async getBlockedUsers(userId) {
        return await this.userRepo.findOne({
            select: {
                id: true,
                blocked_users: {
                    id: true
                },
            },
            relations: {
                blocked_users: true,
            },
            where: {
                id: userId,
            },
            order: {
                blocked_users: {
                    id: 'ASC'
                }
            }
        });
    }
    async findUserById(id) {
        return await this.userRepo.findOneBy({ id: id });
    }
    async findUserWithChannels(id) {
        return await this.userRepo.findOne({
            where: { id: id },
            relations: {
                userRoleChannels: true,
                adminRoleChannels: true,
                ownerRoleChannels: true,
            },
            select: {
                id: true,
                socketId: true,
                userRoleChannels: {
                    id: true,
                    channel_name: true,
                    channel_type: true
                },
                adminRoleChannels: {
                    id: true,
                    channel_name: true,
                    channel_type: true
                },
                ownerRoleChannels: {
                    id: true,
                    channel_name: true,
                    channel_type: true
                }
            },
        });
    }
    async findUserWithBanned(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: {
                userBannedChannels: true,
            },
        });
        return user;
    }
    async userHasAuth(user) {
        if (user.is_two_factor === true)
            return true;
        return false;
    }
    async getUserFromJwt(userToken) {
        if (!userToken)
            return null;
        const payload = this.jwtService.decode(userToken);
        if (!payload)
            return null;
        return await this.userRepo.findOne({
            relations: {
                stat: true,
            },
            where: {
                email: payload.email
            }
        });
    }
    decodeJwtCode(userToken) {
        if (!userToken)
            return null;
        return this.jwtService.decode(userToken.split(' ')[1]);
    }
    async getGameHistory(userId) {
        console.log(userId);
        const data = await this.gameRepo.find({
            where: [
                { user1: userId },
                { user2: userId }
            ],
            order: { CreatedAt: 'DESC' },
            take: 3,
            select: {
                user1: true,
                user2: true,
                userShots: true,
                opponentShots: true
            }
        });
        return data;
    }
    async getFriendLastGame(friendId, userId) {
        const match = await this.gameRepo.findOne({
            where: [
                { user1: userId, user2: friendId },
                { user1: friendId, user2: userId }
            ],
            order: { CreatedAt: 'DESC' },
            select: {
                userShots: true,
                opponentShots: true
            },
        });
    }
    async deleteUserFromDB(id) {
        const user = await this.userRepo.findOneBy({ id: id });
        await this.userRepo.remove(user);
    }
    getPictureById(id) {
        console.log('get picture by photo');
    }
    async getStatsById(id) {
        return await this.userRepo.find({
            select: {
                id: true
            },
            where: {
                id: id
            },
            relations: { stat: true }
        });
    }
    async getLeaderBoard() {
        return await this.statsRepo.find({
            relations: {
                user: true
            },
            order: {
                ladder_level: 'DESC'
            },
            take: 12,
            select: {
                user: {
                    id: true,
                    username: true
                }
            }
        });
    }
    async searchUser(username) {
        return await this.userRepo.findOne({
            where: {
                username: username
            },
            select: {
                id: true,
                username: true,
                firstname: true,
                lastname: true,
                status: true,
            }
        });
    }
    async getAchievement(id) {
        const user = await this.userRepo.findOne({
            where: { id: id },
            relations: {
                stat: {
                    achievements: true,
                },
            }
        });
        return user.stat.achievements;
    }
    async getStat(id) {
        const user = await this.userRepo.findOne({
            where: { id: id },
            relations: {
                stat: true,
            }
        });
        return user.stat;
    }
    async getLastThreeAchievements(id) {
        const achieved = await this.achieveRepo.find({
            where: { is_achieved: true, user_id: id }
        });
        return achieved.slice(0, 3);
    }
    async onlineFriends(id) {
        const user = await this.userRepo.findOne({
            where: { id: id },
            relations: {
                friends: {
                    stat: true,
                },
            }
        });
        const friends = user.friends.filter((friend) => friend.status === 'Online').splice(0, 4);
        return friends;
    }
    async AllFriends(id) {
        console.log('idnumner', id);
        const user = await this.userRepo.findOne({
            relations: {
                friends: {
                    stat: true,
                    match_history: true
                }
            },
            where: {
                id: id,
            },
            select: {
                id: true,
                friends: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    status: true,
                    stat: {
                        wins: true,
                        losses: true,
                        ladder_level: true,
                    },
                    match_history: {
                        opponent: true,
                        user_score: true,
                        opponent_score: true
                    }
                },
            }
        });
        console.log(user);
        return user;
    }
    async addFriend(userId, friendId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: {
                friends: true,
            }
        });
        const friend = await this.userRepo.findOne({
            relations: {
                friends: true
            },
            where: { id: friendId },
        });
        user.friends.push(friend);
        friend.friends.push(user);
        await this.userRepo.save(user);
        await this.userRepo.save(friend);
    }
    async generate2fa(user) {
        const secret = otplib_1.authenticator.generateSecret();
        const otpPathUrl = otplib_1.authenticator.keyuri(user.email, 'Transcendence', secret);
        user.two_factor_secret = secret;
        user.otpPathUrl = otpPathUrl;
        await this.userRepo.save(user);
        return {
            secret,
            otpPathUrl
        };
    }
    otpsetup(user) {
        const secret = otplib_1.authenticator.generateSecret();
        const otpPathUrl = otplib_1.authenticator.keyuri(user.email, 'Transcendence', secret);
        return {
            secret,
            otpPathUrl
        };
    }
    isUserAuthValid(access_token, user) {
        return otplib_1.authenticator.verify({
            token: access_token,
            secret: user.two_factor_secret
        });
    }
    async addUserStat(statDto, userReq) {
        const user = await this.userRepo.findOne({
            where: {
                email: userReq['email']
            },
            relations: {
                stat: true
            },
            select: {
                id: true,
            }
        });
        if (!user || !user.stat)
            throw new common_1.HttpException('User Not found Or failed to create stat', common_1.HttpStatus.NOT_FOUND);
        user.stat.losses = user.stat.losses + statDto.losses;
        user.stat.wins = user.stat.wins + statDto.wins;
        user.stat.ladder_level += statDto.ladder_level;
        user.stat.xp += statDto.xp;
        await this.statsRepo.save(user.stat);
    }
    async getUserProfile(username) {
        return await this.userRepo.findOne({
            relations: {
                stat: {
                    achievements: true,
                }
            },
            where: {
                username: username
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                username: true,
                status: true,
                stat: {
                    achievements: true,
                    ladder_level: true,
                    levelPercentage: true,
                    losses: true,
                    wins: true,
                }
            }
        });
    }
    async getUserDetails(id) {
        const user = await this.userRepo.findOne({
            relations: {
                stat: {
                    achievements: true
                },
            },
            where: {
                id: id,
                stat: {
                    achievements: {
                        is_achieved: true
                    }
                }
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                username: true,
                status: true,
                stat: {
                    achievements: {
                        id: true,
                        badge_name: true,
                        description: true,
                    },
                    ladder_level: true,
                    levelPercentage: true,
                    losses: true,
                    wins: true,
                }
            }
        });
        if (!user)
            throw new common_1.NotFoundException('user not found');
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(stats_entity_1.Stats)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_2.InjectRepository)(achievement_entity_1.Achievement)),
    __param(3, (0, typeorm_2.InjectRepository)(game_entity_1.Game)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map