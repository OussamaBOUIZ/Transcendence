import { Controller, Delete, Get, Header, Param, Post, Query, Res, StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import {Response} from 'express'
import { createReadStream, existsSync } from 'fs';
import * as path from 'path';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Delete('delete/:id')
    async deleteUser(@Param('id') userId: number)
    {
        await await this.userService.deleteUserFromDB(userId);
    }
    @Get('achievements/:id')
    async getAchievements(@Param('id') id: number)
    {
        return await this.userService.getAchievement(id);
    }
    @Get('achievement/firstThree/:id')
    async getLastThree(@Param('id') id: number)
    {
        return await this.userService.getLastThreeAchievements(id);
    }
    @Get('achievement/image/:id')
    @Header('Content-Type', 'image/png')
    async getAchievementImage(@Param('id') id: number)
    {
        const filename = id + '.png';
        const imagePath = path.join(process.cwd(), 'src/images', filename);
        const fileContent = createReadStream(imagePath);
        return new StreamableFile(fileContent);
    }
    @Get('onlinefriends/:id')
    async getOnlineFriends(@Param('id') id: number)
    {
        return await this.userService.onlineFriends(id);
    }
    @Post('addfriend/:id')
    async addFriend(@Param('id') id: number, @Query('friendId') friendId: number, @Res() res: Response)
    {
        await this.userService.addFriend(id, friendId);
        return res.status(201).send(`user has ${friendId} as a friend now`);
    }
    @Get('allfriends/:id')
    async getAllFriends(@Param('id') id: number)
    {
        return await this.userService.AllFriends(id);
    }
}
