import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Achievement } from "../databases/achievement/achievement.entity";
import { Stats } from "../databases/stats.entity";
import { StatsDto } from './dto/stats-dto';
import { Game } from 'src/databases/game.entity';
type tokenPayload = {
    id: number;
    email: string;
};
export declare class UserService {
    private statsRepo;
    private userRepo;
    private achieveRepo;
    private gameRepo;
    private readonly jwtService;
    constructor(statsRepo: Repository<Stats>, userRepo: Repository<User>, achieveRepo: Repository<Achievement>, gameRepo: Repository<Game>, jwtService: JwtService);
    saveUserAvatarPath(userId: number, pathAvatar: string): Promise<User>;
    blockUser(userId: number, user_email: string): Promise<string>;
    onlineUsers(userid: number): Promise<User[]>;
    saveUser(user: User): Promise<void>;
    saveStat(stat: Stats): Promise<void>;
    findUserByEmail(email: string): Promise<User>;
    getBlockedUsers(userId: number): Promise<User>;
    findUserById(id: number): Promise<User>;
    findUserWithChannels(id: number): Promise<User>;
    findUserWithBanned(userId: number): Promise<User>;
    userHasAuth(user: User): Promise<boolean>;
    getUserFromJwt(userToken: string): Promise<User>;
    decodeJwtCode(userToken: string): tokenPayload;
    getGameHistory(userId: number): Promise<Game[]>;
    getFriendLastGame(friendId: number, userId: number): Promise<void>;
    deleteUserFromDB(id: number): Promise<void>;
    getPictureById(id: number): void;
    getStatsById(id: number): Promise<User[]>;
    getLeaderBoard(): Promise<Stats[]>;
    searchUser(username: string): Promise<User>;
    getAchievement(id: number): Promise<Achievement[]>;
    getStat(id: number): Promise<Stats>;
    getLastThreeAchievements(id: number): Promise<Achievement[]>;
    onlineFriends(id: number): Promise<User[]>;
    AllFriends(id: number): Promise<User>;
    addFriend(userId: number, friendId: number): Promise<void>;
    generate2fa(user: User): Promise<{
        secret: string;
        otpPathUrl: string;
    }>;
    otpsetup(user: User): {
        secret: string;
        otpPathUrl: string;
    };
    isUserAuthValid(access_token: string, user: User): boolean;
    addUserStat(statDto: StatsDto, userReq: any): Promise<void>;
    getUserProfile(username: string): Promise<User>;
    getUserDetails(id: number): Promise<User>;
}
export {};
