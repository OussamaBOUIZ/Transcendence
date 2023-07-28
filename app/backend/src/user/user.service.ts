import { Injectable } from '@nestjs/common';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Achievement } from 'src/databases/achievement/achievement.entity';

type tokenPayload = {
    id: number,
    email: string
};

@Injectable()
export class UserService {
    constructor(@InjectRepository (User) private userRepo: Repository<User>
    , @InjectRepository (Achievement) private achieveRepo: Repository<Achievement>
    , private readonly jwtService: JwtService) {}

    async saveUser(user: User)
    {
        await this.userRepo.save(user);
    }
    async findUserByEmail(email: string)
    {
        const user = await this.userRepo.findOneBy({email: email});
        return user;  
    }

    async findUserById(id: number)
    {
        const user = await this.userRepo.findOneBy({id: id});
        return user;
    }

    async getUserFromJwt(userToken: string)
    {
        if(!userToken)
            return null;
        const payload = this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload;
        const user: User = await this.userRepo.findOneBy({id: payload.id});
        return user;
    }
    async deleteUserFromDB(id: number)
    {
        const user: User = await this.userRepo.findOneBy({id: id});
        await this.userRepo.remove(user);
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
}
