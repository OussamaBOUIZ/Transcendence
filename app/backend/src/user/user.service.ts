import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from 'src/databases/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import {Achievement} from "../databases/achievement/achievement.entity";
import {Stats} from "../databases/stats.entity";
import { authenticator } from 'otplib';
import {Match_history} from "../databases/match_history.entity";

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

    async blockUser(userId: number, user: User) {
        const blockedUser = await this.userRepo.findOne({
            where: {id: userId}
        })
        if (!blockedUser)
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        if (user.id == userId) {
            throw new HttpException('You can not block yourself', HttpStatus.BAD_REQUEST)
        }
        if (!user.blocked_users)
            user.blocked_users = []

        user.blocked_users = [...user.blocked_users, blockedUser]
        console.log(await this.userRepo.save(user))
    }

    async saveUser(user: User) {
        await this.userRepo.save(user);
    }
    async saveStat(stat: Stats) {
        await this.statsRepo.save(stat);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepo.findOneBy({email: email});
    }

    async getBlockedUsers(userId: number) {
        return await this.userRepo.findOne({
            select: {
                id: true,
                username: true,
                blocked_users: {
                    id: true,
                    username: true
                },
            },
            relations: {
                blocked_users: true,
            },
            where : {
                id: userId,
            }
        })
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepo.findOneBy({id: id});
    }

    async userHasAuth(email: string)
    {
        const user = await this.userRepo.findOne({
            where: {email: email}
        });
        if(user.is_two_factor === true)
            return user;
        return null;
    }
    async getUserFromJwt(userToken: string): Promise<User> {
        if (!userToken)
            return null;
        const payload = this.jwtService.decode(userToken) as tokenPayload;
        return await this.userRepo.findOneBy({id: payload.id});
    }

    decodeJwtCode(userToken: string) {
        if (!userToken)
            return null
        return this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload
    }

    async getMatchHistory(userId: number): Promise<Match_history[]> {
        return await this.matchHistoryRepo.find({
            // relations: {
            //     opponent: true,
            // },
            // select: {
            //     opponent: {
            //         id: true,
            //         username: true,
            //     }
            // },
            where: {
                user: {
                    id: userId
                }
            },
            take: 4
        })
    }
    async getFriendLastGame(friendId: number)
    {
        const match = await this.matchHistoryRepo.findOne({
            where: {
              opponent: friendId  
            },
            select: {
                user_score: true,
                opponent_score: true,
            }
        });
        return match;
    }

    async deleteUserFromDB(id: number): Promise<void> {
        const user: User = await this.userRepo.findOneBy({id: id});
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
            relations: {stat: true}
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

    async getAchievement(id: number) {
        const user = await this.userRepo.findOne({
            where: {id: id},
            relations: {
                stat: {
                    achievements: true,
                },
            }
        });
        return user;
    }

    async getLastThreeAchievements(id: number) {
        const achieved = await this.achieveRepo.find({
            where: {is_achieved: true, user_id: id}
        })
        return achieved.slice(0, 3);
    }
    async onlineFriends(id: number)
    {
        const user = await this.userRepo.findOne({
            where: {id: id},
            relations: {
                friends: {
                    stat: true,
                },
            }
        });
        const friends: User[] = user.friends.filter((friend) => friend.status === 'Online').splice(0, 4);
        return friends;

    }
    async AllFriends(id: number)
    {
        const user = await this.userRepo.findOne({
            where: {id: id},
            relations: {
                friends: {
                    stat: true,
                }
            },
            select: {
                id: true,
                friends: {
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
    async addFriend(userId: number, friendId: number)
    {
        const user = await this.userRepo.findOne({
            where: {id: userId},
            relations: {
                friends: true,
            }
        });
        const friend = await this.userRepo.findOne({
            where: {id: friendId},
        });
        user.friends.push(friend);
        await this.userRepo.save(user);
    }
    async generate2fa(user: User)
    {
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

    otpsetup(user: User)
    {
        const secret = authenticator.generateSecret();
        const otpPathUrl = authenticator.keyuri(user.email, 'Transcendence', secret);
        return {
            secret,
            otpPathUrl
        }
    }

    isUserAuthValid(access_token: string, user: User)
    {
        console.log(access_token, user.two_factor_secret);
        return authenticator.verify({
            token: access_token,
            secret: user.two_factor_secret
        })
    }
}
