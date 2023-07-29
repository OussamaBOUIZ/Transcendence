import { Controller, Delete, Get, Header, Param, Post, Query, ParseIntPipe, UseGuards,Res, StreamableFile, Req } from '@nestjs/common';
import { UserService } from './user.service';
import {Response, Request} from 'express'
import { createReadStream, existsSync } from 'fs';
import * as path from 'path';
import {JwtGuard} from "../auth/jwt/jwtGuard";

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Delete('delete/:id')
    @UseGuards(JwtGuard)
    async deleteUser(@Param('id') userId: number) // return success
    {
        await this.userService.deleteUserFromDB(userId);
    }

    @Get('achievements/:id')
    @UseGuards(JwtGuard)
    async getAchievements(@Param('id') id: number) {
        return await this.userService.getAchievement(id);
    }

    @Get('leaders')
    @UseGuards(JwtGuard)
    async getGameLeaders() {
        return this.userService.getLeaderBoard()
    }

    @Get()
    @UseGuards(JwtGuard)
    async getuser(@Req() req: Request)
    {
        return await this.userService.retUserData(req.cookies['access_token'])
    }

    @Get('stats/:userId')
    @UseGuards(JwtGuard)
    async getStatsById(
        @Param('userId', ParseIntPipe) id: number
    ) {
       return await this.userService.getStatsById(id)
    }
    @Get('achievement/firstThree/:id')
    @UseGuards(JwtGuard)
    async getLastThree(@Param('id') id: number)
    {
        return await this.userService.getLastThreeAchievements(id);
    }
    @Get('achievement/image/:id')
    @UseGuards(JwtGuard)
    @Header('Content-Type', 'image/png')
    async getAchievementImage(@Param('id', ParseIntPipe) id: number) // todo add parseInt pipe
    {
        const filename = id + '.png';
        const imagePath = path.join(process.cwd(), 'src/images', filename);
        const fileContent = createReadStream(imagePath);
        return new StreamableFile(fileContent);
    }
    @Get('onlinefriends/:id')
    @UseGuards(JwtGuard)
    async getOnlineFriends(@Param('id') id: number)
    {
        return await this.userService.onlineFriends(id);
    }
    @Post('addfriend/:id')
    @UseGuards(JwtGuard)
    async addFriend(@Param('id') id: number, @Query('friendId') friendId: number, @Res() res: Response)
    {
        await this.userService.addFriend(id, friendId);
        return res.status(201).send(`user has ${friendId} as a friend now`);
    }
    @Get('allfriends/:id')
    @UseGuards(JwtGuard)
    async getAllFriends(@Param('id') id: number)
    {
        return await this.userService.AllFriends(id);
    }
}
