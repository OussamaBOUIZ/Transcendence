/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Match_history } from "../databases/match_history.entity";
import { BlockedTokenlistService } from 'src/databases/BlockedTokenList/BlockedTokenList.service';
import { StatsDto } from './dto/stats-dto';
import { GameHistoryDto } from './game-history-dto/game-history-dto';
import { searchDto } from './game-history-dto/search-dto';
import { statusDto, userDataDto, userNamesDto } from './dto/userDataDto';
export declare class UserController {
    private readonly userService;
    private readonly jwt;
    private readonly BlockedTokenService;
    constructor(userService: UserService, jwt: JwtService, BlockedTokenService: BlockedTokenlistService);
    updateUserStatus(req: Request, body: statusDto): Promise<void>;
    getUserData(req: Request): Promise<import("../databases/user.entity").User>;
    getOnlineUsers(req: Request): Promise<import("../databases/user.entity").User[]>;
    uploadImage(id: number, image: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAvatar(id: number, image: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(userId: number): Promise<string>;
    getAchievements(id: number): Promise<import("../databases/achievement/achievement.entity").Achievement[]>;
    getGameLeaders(): Promise<import("../databases/stats.entity").Stats[]>;
    getUserById(id: number): Promise<import("../databases/user.entity").User>;
    getBlockedUser(userId: number, req: Request): Promise<{
        id: number;
    }[]>;
    blockUser(userId: number, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAvatarById(id: number): Promise<StreamableFile>;
    getStatsById(id: number): Promise<import("../databases/user.entity").User[]>;
    getLastThree(id: number): Promise<import("../databases/achievement/achievement.entity").Achievement[]>;
    getAchievementImage(id: number): Promise<StreamableFile>;
    getOnlineFriends(id: number): Promise<import("../databases/user.entity").User[]>;
    addFriend(id: number, friendId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllFriends(id: number): Promise<import("../databases/user.entity").User>;
    getFriendLastGame(friendId: number, userId: number): Promise<Match_history>;
    getGameHistory(userId: number): Promise<Match_history[]>;
    turnOn2fa(id: number, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    turnOff2fa(id: number, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    isTurned2fa(id: number, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login2fa(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    setUserNames(userData: userNamesDto, req: Request, res: Response, id: number): Promise<Response<any, Record<string, any>>>;
    postUsername(userData: userDataDto, req: Request, res: Response, id: number): Promise<Response<any, Record<string, any>>>;
    isFirstLog(req: Request, res: Response): Promise<boolean>;
    logout(id: number, req: Request, res: Response): Promise<void>;
    addUserStat(statDto: StatsDto, req: Request): Promise<void>;
    createGameHistory(gameHistoryDto: GameHistoryDto): Promise<{
        Message: string;
    }>;
    searchForUser(dto: searchDto): Promise<import("../databases/user.entity").User>;
    getUserDetails(id: number): Promise<import("../databases/user.entity").User>;
    getUserProfile(username: string): Promise<import("../databases/user.entity").User>;
}
