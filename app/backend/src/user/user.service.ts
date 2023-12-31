import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/databases/user.entity';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt';
import { Achievement } from "../databases/achievement/achievement.entity";
import { Stats } from "../databases/stats.entity";
import { authenticator } from 'otplib';
import { StatsDto } from './dto/stats-dto';
import { Game } from 'src/databases/game.entity';
import { gameData } from 'src/interfaces/interfaces';

type tokenPayload = {
    id: number,
    email: string
};

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Stats) private statsRepo: Repository<Stats>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Achievement) private achieveRepo: Repository<Achievement>,
        @InjectRepository(Game) private gameRepo: Repository<Game>,
        private readonly jwtService: JwtService
    ) {
    }

    async saveUserAvatarPath(userId: number, pathAvatar: string) {
        const user = await this.userRepo.findOneBy({ id: userId })
        if (!user)
            return null
        user.avatar = pathAvatar
       return await this.userRepo.save(user)
    }

    async blockUser(userId: number, user_email: string) {

        const user = await this.userRepo.findOne({
            relations: {
                blocked_users: true
            },
            where: {
                email: user_email
            }
        })

        const blockedUser = await this.userRepo.findOne({
            where: { id: userId }
        })
        
        if(user.blocked_users.some((user) => user.id === blockedUser.id))
            return 'user is already blocked';

        if (!user.blocked_users)
            user.blocked_users = []

        user.blocked_users = [...user.blocked_users, blockedUser]
        await this.userRepo.save(user)
    }

    async onlineUsers(userid: number) {
        const user =  await this.userRepo.find({
            where : {
                id: Not(userid),
                status: In(['Online', 'In A Game'])
            },
            select: {
                id: true,
                status: true,
                username: true,
            }
        })
        return user
    }

    async saveUser(user: User) {
        await this.userRepo.save(user);
    }
    async saveStat(stat: Stats) {
        await this.statsRepo.save(stat);
    } 

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepo.findOneBy({ email: email });
    }

    async getBlockedUsers(userId: number) {
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
        })
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepo.findOneBy({id: id});
    }

    async findUserWithChannels(id: number): Promise<User> {
        return await this.userRepo.findOne({
            where: {id: id},
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

    async findUserWithBanned(userId: number)
    {
        const user = await this.userRepo.findOne({
            where: {id: userId},
            relations: {
                userBannedChannels: true,
            },
        });
        return user;
    }
    
    async userHasAuth(user: User) {
        if (user.is_two_factor === true)
            return true;
        return false;
    }
    async getUserFromJwt(userToken: string): Promise<User> {
        if (!userToken)
            return null;
        const payload = this.jwtService.decode(userToken) as tokenPayload;
        if (!payload) return null;
        return await this.userRepo.findOne({
            relations: {
                stat: true,
            },
            where: {
                email: payload.email
            }
        });
    }

    decodeJwtCode(userToken: string) {
        if (!userToken)
            return null
        return this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload
    }

    async getGameHistory(userId: number, toTake: number = 4) {
        const data = await this.gameRepo.find({
            where: [
                { user1: userId },
                { user2: userId }
            ],
            order: {CreatedAt: 'DESC'},
            take: toTake,
            select: {
                user1: true,
                user2: true,
                userShots: true,
                opponentShots: true,
                CreatedAt: true
            }
        });

        let storedUser1: User;
       const retData = await Promise.all(data.map(async (game): Promise<gameData> => {
            let user1: User;
            let user2: User;
            if(storedUser1 == null || storedUser1.id !== game.user1)
                user1 = await this.userRepo.findOne({where: {id: game.user1}})
            else
                user1 = storedUser1;
            if (storedUser1 == null || storedUser1.id !== game.user2)
                user2 = await this.userRepo.findOne(({where: {id: game.user2}}))
            else
                user2 = storedUser1;
            if(storedUser1 !== null && user1.id == userId)
                storedUser1 = user1;
            else if(storedUser1 !== null && user2.id == userId)
                storedUser1 = user2;
            return {
                userId: user1.id,
                userName: user1.username,
                userScore: game.userShots,
                opponentScore: game.opponentShots,
                opponentId: user2.id,
                opponentUserName: user2.username
            }
        }))
        return retData;
    }

    async getFriendLastGame(friendId: number, userId: number)
    {   
        const match = await this.gameRepo.findOne({
            where: [
                {user1: userId, user2: friendId},
                {user1: friendId, user2: userId}
            ],
            order: {CreatedAt: 'DESC'},
            select: {
                userShots: true,
                opponentShots: true
            },
        });

        
        if (!match)
            return ""
        
        return {
            id: userId,
            opponent: friendId,
            opponent_score: match.user1 === friendId ? match.userShots : match.opponentShots,
            user_score: match.user2 !== friendId ? match.userShots : match.opponentShots
         }

    }

    async deleteUserFromDB(id: number): Promise<void> {
        const user: User = await this.userRepo.findOneBy({ id: id });
        await this.userRepo.remove(user);
    }

    async getStatsById(id: number) {
        return await this.userRepo.find({
            select: {
                id: true
            },
            where: {
                id: id
            },
            relations: { stat: true }
        })
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
        })
    }


    async searchUser(username: string) {
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
        })
    }

    async getAchievement(id: number) {
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

    async getStat(id: number) {
        const user = await this.userRepo.findOne({
            where: { id: id },
            relations: {
                stat: true,
            }
        });
        return user.stat;
    }

    async getLastThreeAchievements(id: number) {
        const achieved = await this.achieveRepo.find({
            where: { is_achieved: true, user_id: id }
        })
        return achieved.slice(0, 3);
    }
    // async onlineFriends(id: number) {
    //     const user = await this.userRepo.findOne({
    //         where: { id: id },
    //         relations: {
    //             friends: {
    //                 stat: true,
    //             },
    //         }
    //     });
    //     const friends: User[] = user.friends.filter((friend) => friend.status === 'Online').splice(0, 4);
    //     return friends;

    // }
    async AllFriends(id: number) {
        const user = await this.userRepo.findOne({
            relations: {
                friends: {
                    stat: true,
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
                    }
                },
                
            }
        });

        return user;
    }
    async addFriend(userId: number, friendId: number) {
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
        friend.friends.push(user)
        await this.userRepo.save(user);
        await this.userRepo.save(friend)
    }
    async generate2fa(user: User) {
        const secret = authenticator.generateSecret();
        const otpPathUrl = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
        user.two_factor_secret = secret;
        user.otpPathUrl = otpPathUrl;
        await this.userRepo.save(user);
        return {
            secret,
            otpPathUrl
        }
    }

    otpsetup(user: User) {
        const secret = authenticator.generateSecret();
        const otpPathUrl = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
        return {
            secret,
            otpPathUrl
        }
    }

    isUserAuthValid(access_token: string, user: User) {
        return authenticator.verify({
            token: access_token,
            secret: user.two_factor_secret
        })
    }


    async addUserStat(statDto: StatsDto, userReq: any) {

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
        })

        if (!user || !user.stat)
            throw new HttpException('User Not found Or failed to create stat', HttpStatus.NOT_FOUND)


        user.stat.losses = user.stat.losses + statDto.losses
        user.stat.wins = user.stat.wins + statDto.wins
        user.stat.ladder_level += statDto.ladder_level
        user.stat.xp += statDto.xp
        await this.statsRepo.save(user.stat)
    }


    async getUserProfile(username: string) {
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
        })
    }

    async getUserDetails(id: number) {
        const user =  await this.userRepo.findOne({
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
        })
        if (!user)
            throw new NotFoundException('user not found')
        return user
    }
}