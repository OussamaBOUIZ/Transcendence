
import {Controller, Request, Header, Get,Delete, Param, ParseIntPipe, UseGuards, StreamableFile} from '@nestjs/common';
import { UserService } from './user.service';
import {Response} from 'express'
import { createReadStream, existsSync } from 'fs';
import * as path from 'path';
import {JwtGuard} from "../auth/jwt/jwtGuard";

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Delete('delete/:id')
    async deleteUser(@Param('id') userId: number) // return success
    {
        await this.userService.deleteUserFromDB(userId);
    }

    @Get('achievements/:id')
    async getAchievements(@Param('id') id: number) {
        return await this.userService.getAchievement(id);
    }

    @Get('leaders')
    async getGameLeaders() {
        return this.userService.getLeaderBoard()
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findUserById(id)
    }

    @Get('stats/:userId')
    async getStatsById(
        @Param('userId', ParseIntPipe) id: number,
        @Request() req
    ) {
       return await this.userService.getStatsById(id)
    }
    @Get('achievement/firstThree/:id')
    async getLastThree(@Param('id') id: number)
    {
        return await this.userService.getLastThreeAchievements(id);
    }
    @Get('achievement/image/:id')
    @Header('Content-Type', 'image/png')
    async getAchievementImage(@Param('id', ParseIntPipe) id: number) // todo add parseInt pipe
    {
        const filename = id + '.png';
        const imagePath = path.join(process.cwd(), 'src/images', filename);
        const fileContent = createReadStream(imagePath);
        return new StreamableFile(fileContent);
    }


}
