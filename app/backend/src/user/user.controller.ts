import { Controller, Delete, Get, Header, Param, Post, Query, ParseIntPipe, UseGuards,Res, StreamableFile, Req, Headers, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import {Request, Response} from 'express'
import { createReadStream, existsSync } from 'fs';
import * as path from 'path';
import {JwtGuard} from "../auth/jwt/jwtGuard";
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUserData(@Req() req: Request)
    {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        const userData = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
        };
        return userData;
    }
    @Delete('delete/:id')
    async deleteUser(@Param('id') userId: number) // return success
    {
        await this.userService.deleteUserFromDB(userId);
        return 'success';
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
        @Param('userId', ParseIntPipe) id: number
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
    // @Get('generate2fa/:id')
    // @UseGuards(JwtGuard)
    // generate2faForUser(@Param('id') id: number, @Req() req: Request)
    // {
    //     const data = await this.userService.generate2fa(id);

    // }

    @Post('2fa/turn-on/:id')
    @UseGuards(JwtGuard)
    async turnOn2fa(@Param('id') id: number, @Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.findUserById(id);
        const data2fa = this.userService.otpsetup(user);
        user.two_factor_secret = data2fa.secret;
        user.otpPathUrl = data2fa.otpPathUrl;
        user.is_two_factor = true;
        await this.userService.saveUser(user);
        return res.status(200).send('two factor was turned on')
    }

    @Post('2fa/login/')
    @UseGuards(JwtGuard)
    async login2fa(@Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token'])
        const isCodeValid = this.userService.isUserAuthValid(
            req.body.token,
            user
        );
        console.log(isCodeValid);
        if(!isCodeValid)
            return res.status(400).send('two factor token is invalid');
        return res.status(200).send('correct two factor token');
    }
}
