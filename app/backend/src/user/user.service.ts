import {Injectable} from '@nestjs/common';
import {User} from 'src/databases/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import {Achievement} from "../databases/achievement/achievement.entity";
import {Stats} from "../databases/stats.entity";
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

    async saveUser(user: User) {
        await this.userRepo.save(user);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepo.findOneBy({email: email});
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepo.findOneBy({id: id});
    }

    async getUserFromJwt(userToken: string): Promise<User> {
        if (!userToken)
            return null;
        const payload = this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload;
        return await this.userRepo.findOneBy({email: payload.email}) ;
    }

    decodeJwtCode(userToken: string) {
        if (!userToken)
            return null
        return this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload
    }

    async getMatchHistory(userId: number): Promise<Match_history[]> {
        return await  this.matchHistoryRepo.find({
            relations: {
                opponent: true,
            },
            select: {
                opponent: {
                    id: true,
                    username: true,
                }
            } ,
            where: {
                user: {
                    id: userId
                }
            },
            take: 4
        })
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
        return user.stat.achievements;
    }

    async getLastThreeAchievements(id: number) {
        const achieved = await this.achieveRepo.find({
            where: {is_achieved: true, user_id: id}
        })
        return achieved.slice(0, 3);
    }
}
