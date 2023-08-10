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
    Post, Req, Res, HttpStatus, UploadedFile, Query, Body, UseFilters,

} from '@nestjs/common';
import { UserService } from './user.service';
import {Request, Response, raw} from 'express'
import { createReadStream } from 'fs';
import * as path from 'path';
import {JwtGuard} from "../auth/jwt/jwtGuard";
import { JwtService } from '@nestjs/jwt';
import { BlockedTokenlistService } from 'src/databases/BlockedTokenList/BlockedTokenList.service';
import {Match_history} from "../databases/match_history.entity";
import { userDataDto } from './dto/userDataDto';
import { ViewAuthFilter } from 'src/Filter/filter';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService
        , private readonly jwt: JwtService
        , private readonly BlockedTokenService: BlockedTokenlistService) {}

    @Get()
    @UseGuards(JwtGuard)
    // @UseFilters(V)
    async getUserData(@Req() req: Request)
    {
        console.log('HERE');
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

    @Get(':id/data')
    @UseFilters(ViewAuthFilter)
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

    @Get()
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
    @Get('friendLastGame/:friendId')
    async getFriendLastGame(@Param('friendId', ParseIntPipe) friendId: number, @Query('userId') userId: number)
    {
        return await this.userService.getFriendLastGame(friendId, userId);
    }

    @Get('game/history/:userId')
    async getGameHistory(@Param('userId', ParseIntPipe) userId: number) : Promise<Match_history[]> {
        return await this.userService.getMatchHistory(userId)
    }

    @Get('2fa/turn-on/:id')
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
    @Get('2fa/turn-off/:id')
    @UseGuards(JwtGuard)
    async turnOff2fa(@Param('id') id: number, @Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.findUserById(id);
        user.two_factor_secret = null;
        user.otpPathUrl = null;
        user.is_two_factor = false;
        await this.userService.saveUser(user);
        return res.status(200).send('two factor was turned off')
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

    @Post('setUserData/:id')
    @UseGuards(JwtGuard)
    async postUsername(@Body() userData: userDataDto, @Req() req: Request, @Res() res: Response,
    @Param('id', ParseIntPipe) id: number)
    {
        const user = await this.userService.findUserById(id);
        if(userData.username.length === 0)
        {
            try {
                user.username = userData.username;
                await this.userService.saveUser(user);
            }
            catch (error)
            {
                return res.status(400).send('nickname is already used');
            }
        }
        else
        {
            user.firstname = userData.firstname;
            user.lastname = userData.lastname;
            await this.userService.saveUser(user);
        }
        return res.status(201).send('data was set succesfully');
    }
    @Get('isFirstLog')
    @UseGuards(JwtGuard)
    async isFirstLog(@Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        return user.firstLog;
    }
    @Get('logout/:id')
    @UseGuards(JwtGuard)
    async logout(@Param('id') id: number, @Req() req: Request, @Res() res: Response)
    {
        const token = req.cookies['access_token'];
        const user = await this.userService.findUserById(id);
        const payload = this.jwt.verify(token, {secret: process.env.JWT_SECRET});
        const till = payload.iat + 86400;
        await this.BlockedTokenService.blacklistToken(token, till * 1000);
        user.status = 'Offline';
        await this.userService.saveUser(user);
        return res.redirect('http://localhost:5137/');
    }
}
