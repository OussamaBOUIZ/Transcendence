/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { BlockedTokenlistService } from 'src/databases/BlockedTokenList/BlockedTokenList.service';
import { StatsDto } from './dto/stats-dto';
import { searchDto } from './game-history-dto/search-dto';
import { statusDto, userDataDto } from './dto/userDataDto';
import { Game } from 'src/databases/game.entity';
export declare class UserController {
    private readonly userService;
    private readonly jwt;
    private readonly BlockedTokenService;
    constructor(userService: UserService, jwt: JwtService, BlockedTokenService: BlockedTokenlistService);
    updateUserStatus(req: any, body: statusDto): Promise<void>;
    getUserData(req: Request): Promise<import("../databases/user.entity").User>;
    getOnlineUsers(req: any): Promise<import("../databases/user.entity").User[]>;
    uploadImage(id: number, image: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAvatar(id: number, image: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(userId: number): Promise<string>;
    getAchievements(id: number): Promise<import("../databases/achievement/achievement.entity").Achievement[]>;
    getGameLeaders(): Promise<import("../databases/stats.entity").Stats[]>;
    getUserById(id: number): Promise<import("../databases/user.entity").User>;
    getBlockedUser(userId: number, req: Request): Promise<{
        id: number;
    }[]>;
    blockUser(userId: number, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getAvatarById(id: number): Promise<StreamableFile>;
    getStatsById(id: number): Promise<import("../databases/user.entity").User[]>;
    getLastThree(id: number): Promise<import("../databases/achievement/achievement.entity").Achievement[]>;
    getAchievementImage(id: number): Promise<StreamableFile>;
    getOnlineFriends(id: number): Promise<import("../databases/user.entity").User[]>;
    addFriend(id: number, friendId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllFriends(id: number): Promise<import("../databases/user.entity").User>;
    getGameHistory(userId: number): Promise<Game[]>;
    turnOn2fa(id: number, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    turnOff2fa(id: number, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login2fa(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    postUsername(userData: userDataDto, req: Request, res: Response, id: number): Promise<Response<any, Record<string, any>>>;
    isFirstLog(req: Request, res: Response): Promise<boolean>;
    logout(id: number, req: Request, res: Response): Promise<void>;
    addUserStat(statDto: StatsDto, req: any): Promise<void>;
    searchForUser(dto: searchDto): Promise<import("../databases/user.entity").User>;
    getUserDetails(id: number): Promise<import("../databases/user.entity").User>;
    getUserProfile(username: string): Promise<import("../databases/user.entity").User>;
}
