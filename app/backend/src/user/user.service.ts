import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt';
import { Achievement } from "../databases/achievement/achievement.entity";
import { Stats } from "../databases/stats.entity";
import { Match_history } from "../databases/match_history.entity";
import { authenticator } from 'otplib';
import { StatsDto } from './dto/stats-dto';
import { GameHistoryDto } from './game-history-dto/game-history-dto';

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
        @InjectRepository(Match_history) private matchHistoryRepo: Repository<Match_history>,
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
        
        if (!blockedUser)
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        if (user.id == userId) {
            throw new HttpException('You can not block yourself', HttpStatus.BAD_REQUEST)
        }
        console.log('b user', user.blocked_users);
        console.log('b user', user);
        
        if (!user.blocked_users)
            user.blocked_users = []

        user.blocked_users = [...user.blocked_users, blockedUser]
        await this.userRepo.save(user)
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
        return await this.userRepo.findOneBy({ id: payload.id });
    }

    decodeJwtCode(userToken: string) {
        if (!userToken)
            return null
        return this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload
    }

    async getMatchHistory(userId: number): Promise<Match_history[]> {
        return await this.matchHistoryRepo.find({
            where: {
                user: {
                    id: userId
                }
            },
            take: 4
        })
    }
    async getFriendLastGame(friendId: number, userId: number)
    {
        // const match = await this.matchHistoryRepo
        // .createQueryBuilder('match_history')
        // .where('match_history.userId = :userId', { userId })
        // .andWhere('match_history.opponent = :friendId', { friendId })
        // .orderBy('match_history.id', 'DESC')
        // .getOne(); 
        const match = await this.matchHistoryRepo.findOne({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: userId
                },
                opponent: friendId, 
            },
            order: {
                id: 'DESC',
            },
            select: {
                user_score: true,
                opponent_score: true,
            }
        });
        return match;
    }

    async deleteUserFromDB(id: number): Promise<void> {
        const user: User = await this.userRepo.findOneBy({ id: id });
        await this.userRepo.remove(user);
    }

    getPictureById(id: number) {
        console.log('get picture by photo')
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
            take: 3,
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
                lastname: true
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

    async getLastThreeAchievements(id: number) {
        const achieved = await this.achieveRepo.find({
            where: { is_achieved: true, user_id: id }
        })
        return achieved.slice(0, 3);
    }
    async onlineFriends(id: number) {
        const user = await this.userRepo.findOne({
            where: { id: id },
            relations: {
                friends: {
                    stat: true,
                },
            }
        });
        const friends: User[] = user.friends.filter((friend) => friend.status === 'Online').splice(0, 4);
        return friends;

    }
    async AllFriends(id: number) {
        const user = await this.userRepo.findOne({
            where: { id: id },
            relations: {
                friends: {
                    stat: true,
                }
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
            where: { id: friendId },
        });
        user.friends.push(friend);
        await this.userRepo.save(user);
    }
    async generate2fa(user: User) {
        const secret = authenticator.generateSecret();
        const otpPathUrl = authenticator.keyuri(user.email, 'Transcendence', secret);
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
        const otpPathUrl = authenticator.keyuri(user.email, 'Transcendence', secret);
        return {
            secret,
            otpPathUrl
        }
    }

    isUserAuthValid(access_token: string, user: User) {
        console.log(access_token, user.two_factor_secret);
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



    async addGameHistory(gameHistoryDto: GameHistoryDto) {

        let match_history = new Match_history()
        match_history.opponent_score = gameHistoryDto.opponent_score
        match_history.user_score = gameHistoryDto.user_score

        try {
            const oppenent  = await this.findUserById(gameHistoryDto.opponentId)
            match_history.opponent = oppenent.id
            const user = await this.findUserById(gameHistoryDto.userId)
            match_history.user = user
            const history = await this.userRepo.find({
                relations: {
                    match_history: true
                },
                where: {
                    id: gameHistoryDto.userId
                }
            })
            if (!history['match_history'])
                user.match_history = [match_history]
            else
                user.match_history = [...user.match_history, match_history]
            await this.matchHistoryRepo.save(match_history)
        }
        catch (e) {
            console.log(e)
            throw new HttpException("The User Not found", HttpStatus.NOT_FOUND)
        }
    }

    async getUserProfile(username: string) {
        return await this.userRepo.findOne({
            where: {
                username: username
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                username: true,
                status: true,
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
                stat: {
                   achievements: {
                        id: true,
                        badge_name: true,
                        description: true,
                   },
                   ladder_level: true,
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
