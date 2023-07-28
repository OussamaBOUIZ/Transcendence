import { Injectable } from '@nestjs/common';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

type tokenPayload = {
    id: number,
    email: string
};

@Injectable()
export class UserService {
    constructor(@InjectRepository (User) private userRepo: Repository<User>,
    @InjectRepository (Achievement) private achieveRepo: Repository<Achievement>
    , private readonly jwtService: JwtService) {}

    async saveUser(user: User)
    {
        await this.userRepo.save(user);
    }

    async findUserByEmail(email: string): Promise<User>
    {
        return await this.userRepo.findOneBy({email: email});
    }

    async findUserById(id: number): Promise<User>
    {
        return await this.userRepo.findOneBy({id: id});
    }

    async getUserFromJwt(userToken: string): Promise<User>
    {
        if(!userToken)
            return null;
        const payload = this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload;
        const user: User = await this.userRepo.findOneBy({id: payload.id});
        return user;
    }

    async deleteUserFromDB(id: number): Promise<void>
    {
        const user: User = await this.userRepo.findOneBy({id: id});
        await this.userRepo.remove(user);
    }
    getPictureById(id: number) {
        console.log('get picture by photo')
    }

    async getStatsById(id: number) {
       return await this.userRepo.find({
           select: {
               id: true,
               // stat: {
               //     wins: true,
               //     ladder_level: true,
               //     xp: true,
               //     losses: true
               // }
           } ,
           where: {
                id: id
            },
           relations: {stat: true}
       })
    }
    getLeaderBoard() {

    }
    async getAchievement(id: number)
    {
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
    async getLastThreeAchievements(id: number)
    {
        const achieved = await this.achieveRepo.find({
            where: {is_achieved: true, user_id: id}
        })
        const firstThree = achieved.slice(0, 3);
        return firstThree;
    }
}
