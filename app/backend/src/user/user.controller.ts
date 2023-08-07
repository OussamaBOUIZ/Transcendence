
import {
    Controller,
    Header,
    Get,
    Delete,
    Param,
    ParseIntPipe,
    UseGuards,
    StreamableFile,
    UnauthorizedException,
    Post, Req, Res, HttpStatus, UploadedFile, Body, Patch, HttpCode, Query,

} from '@nestjs/common';
import { UserService } from './user.service';
import {raw, Request, Response} from 'express'
import { createReadStream } from 'fs';
import * as path from 'path';
import {JwtGuard} from "../auth/jwt/jwtGuard";
import {Match_history} from "../databases/match_history.entity";
import { GameHistoryDto } from './game-history-dto/game-history-dto';
import { searchDto } from './game-history-dto/search-dto';

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

    @Get('block/:userId')
    async getBlockedUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req: Request
    )
    {
        const user = await this.userService.findUserByEmail(req.user["email"])
        const User1 =  await this.userService.getBlockedUsers(user.id)
        return await this.userService.getBlockedUsers(userId)
    }
    @Post('block/:userId')
    async blockUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req: Request,
        @Res() res: Response
    ) {
        // console.log(req.user['email'], "ok")
        const user = await this.userService.findUserByEmail(req.user['email'])
        console.log(user.id, userId)
        await this.userService.blockUser(userId, user)
        return res.status(HttpStatus.OK).send('the user blocked ')
    }

    @Get('user')
    async getUserFromJwt(@Req() req: Request)
    {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token'] || req.headers.authorization)
        if (!user)
            throw new UnauthorizedException()
        return {
            id: user.id,
            username: user.username,
        }
    }


    // @Post('/:userId/uploadImage')
    // uploadImage(
    //     @Param('userId', ParseIntPipe) id: number,
    //     @UploadedFile() image
    // ) {
    //
    // }
    @Get('image/:id')
    @Header('Content-Type', 'image/png')
    async getPictureById(@Param('id', ParseIntPipe) id: number) : Promise<StreamableFile>
    {
        const filename = id + '.png';
        const imagePath = path.join(process.cwd(), 'src/usersImage', filename);
        const fileContent = createReadStream(imagePath)
        return new StreamableFile(fileContent);
    }
    @Get('stats/:userId')
    async getStatsById( @Param('userId', ParseIntPipe) id: number) {
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

    @Get('game/history/:userId')
    async getGameHistory(@Param('userId', ParseIntPipe) userId: number) : Promise<Match_history[]> {
        return await this.userService.getMatchHistory(userId)
    }


    @Post('gameHistory/add')
    @HttpCode(HttpStatus.CREATED)
    async createGameHistory(@Body() gameHistoryDto: GameHistoryDto) {
        console.log(gameHistoryDto)
        await this.userService.addGameHistory(gameHistoryDto)
        return {
            Message: "The content is created"
        }
    }

 
    @Get()
    async   searchForUser(@Query() dto: searchDto) {
        const {username} = dto
        console.log(username)
        return this.userService.searchUser(username)
        console.log(username);
    }
}
