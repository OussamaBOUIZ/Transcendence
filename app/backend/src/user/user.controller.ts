
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
	UseInterceptors,
	Post, Req, Res, HttpStatus,
	UploadedFile, Body, Patch, HttpCode, Query,
	HttpException, ParseFilePipe,
	UseFilters,
	Logger,
	UsePipes,
	ValidationPipe,
	NotFoundException, Put, InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { Request, Response } from 'express'
import { createReadStream, promises as fsPromises } from 'fs';
import * as path from 'path';
import { JwtGuard } from "../auth/jwt/jwtGuard";
import { JwtService } from '@nestjs/jwt';
import { BlockedTokenlistService } from 'src/databases/BlockedTokenList/BlockedTokenList.service';
import { StatsDto } from './dto/stats-dto';
import { GameHistoryDto } from './game-history-dto/game-history-dto';
import { searchDto } from './game-history-dto/search-dto';
import { diskStorage } from 'multer'
import { extname } from 'path';
import { access, unlink } from 'fs/promises';

import { statusDto, userDataDto, userNamesDto } from './dto/userDataDto';
import { ViewAuthFilter } from 'src/Filter/filter';


const DirUpload = './uploads/usersImage/'

const multerConfig = () => ({
	storage: diskStorage({
		destination: DirUpload,
		filename: async (req: any, file: any, cb: any) => {
			const supportedExt = ['.png', '.jpeg', '.jpg']
			if (isNaN(parseInt(req.params['userId'], 10)))
				return cb(new HttpException('userId Must be a number', HttpStatus.BAD_REQUEST), false)

			if (!supportedExt.includes(extname(file.originalname)))
				return cb(new HttpException(`Unsupported file type ${file.originalname.ext}`, HttpStatus.BAD_REQUEST), false)
			const extention = path.parse(file.originalname).ext
			const filename = req.params['userId'] + extention
			try {
				await fsPromises.access(DirUpload + filename)
				cb(new HttpException(`Wrong Http Method`, HttpStatus.METHOD_NOT_ALLOWED))
			}
			catch (e) {
				cb(null, filename)
			}
		}
	})
})

const updateMuliterConfig = () => ({
	storage: diskStorage({
		destination: DirUpload,
		filename: async (req: any, file: any, cb: any) => {
			const supportedExt = ['.png', '.jpeg', '.jpg']
			if (isNaN(parseInt(req.params['userId'], 10)))
				return cb(new HttpException('userId Must be a number', HttpStatus.BAD_REQUEST), false)

			if (!supportedExt.includes(extname(file.originalname)))
				return cb(new HttpException(`Unsupported file type ${file.originalname.ext}`, HttpStatus.BAD_REQUEST), false)
			const extention = path.parse(file.originalname).ext
			const filename = req.params['userId'] + extention
			// try {
				cb(null, filename)
			// }
			// catch (e) {
				// cb(null, filename)
			// }
		}
	})
})
 
@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService
        , private readonly jwt: JwtService
        , private readonly BlockedTokenService: BlockedTokenlistService) {}

    @Put('updateStatus')
    async updateUserStatus(@Req() req, @Body() body: statusDto) {
        const userEmail = req.user.email
        const user = await this.userService.findUserByEmail(userEmail)
        if (!user)
            throw new NotFoundException('user not exist')
        user.status = body.status
        await this.userService.saveUser(user)
    }
    
    @Get()
    @UseGuards(JwtGuard)
    // @UseFilters(V)
    async getUserData(@Req() req: Request)
    {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        if (!user)
            throw new NotFoundException('User not Found')
        return await this.getUserDetails(user.id)
    }   

    @Get('online/users')
    async getOnlineUsers(@Req() req) {

        const user = await this.userService.findUserByEmail(req.user.email)
        if (!user)
            throw new NotFoundException('user not found')
        return await this.userService.onlineUsers(user.id)
    }

    @Post('/:userId/upload')
	@UseInterceptors(FileInterceptor('image', multerConfig()))
	@HttpCode(HttpStatus.CREATED)
	async uploadImage(
		@Param('userId', ParseIntPipe) id: number,
		@UploadedFile(new ParseFilePipe({
			fileIsRequired: false,
		})) image: Express.Multer.File,
		@Res() res: Response
	) {
        
        
	    await this.userService.saveUserAvatarPath(id, image.path)
        return  res.status(HttpStatus.CREATED).send('Avatar Uploaded')
	}

    @Put('/:userId/avatar/')
	@UseInterceptors(FileInterceptor('image', updateMuliterConfig()))
	async updateAvatar(
		@Param('userId', ParseIntPipe) id: number,
		@UploadedFile(new ParseFilePipe({
			fileIsRequired: false
		})) image: Express.Multer.File,
		@Res() res: Response
	) {
		const user = await this.userService.saveUserAvatarPath(id, image.path)
		if (!user) {
			await unlink(image.path)
			throw new NotFoundException('The User Not Found')
		}
		return res.status(HttpStatus.CREATED).send('Avatar Uploaded')
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

    @Get('blockedUsers/:userId')
    async getBlockedUser(
        @Param('userId', ParseIntPipe) userId: number,
    )
    {
        const user = await this.userService.findUserById(userId)
        if (!user)
            throw new NotFoundException('user not found')
        const blockedUsers =  await this.userService.getBlockedUsers(user.id)
        const trans = blockedUsers.blocked_users.map(user => ({id: user.id}))
        
        return trans
    }


    @Post('block/:userId')
    async blockUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req,
        @Res() res: Response
    ) {
        
        const ret = await this.userService.blockUser(userId, req.user.email)
        if(typeof ret === 'string')
            return res.status(HttpStatus.OK).send(ret); 
        return res.status(HttpStatus.OK).send('');
    }

	@Get('avatar/:id')
	@Header('Content-Type', 'image/jpg')
	async getAvatarById(@Param('id', ParseIntPipe) id: number): Promise<StreamableFile> {
		const user = await this.userService.findUserById(id)
		if (!user)
			throw new HttpException('User Not Found !!', HttpStatus.NOT_FOUND)
		const imagePath = user.avatar
		try {
			await access(imagePath, fsPromises.constants.R_OK)
			const fileContent = createReadStream(imagePath)
			return new StreamableFile(fileContent);
		}
		catch (e) {
            const filename = 'default.jpg';
            const defaultPath = path.join(process.cwd(), 'uploads/usersImage', filename);
			const fileContent = createReadStream(defaultPath)
			return new StreamableFile(fileContent);
		}
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
    @Header('Content-Type', 'image/jpg')
    async getAchievementImage(@Param('id', ParseIntPipe) id: number) // todo add parseInt pipe
    {
        const filename = id % 14 !== 0 ? (id % 14) + '.jpg' : 14 + '.jpg'
        const imagePath = path.join(process.cwd(), 'src/achievementImages', filename);
        const fileContent = createReadStream(imagePath);
        return new StreamableFile(fileContent);
    }

    // @Get('onlinefriends/:id')
    // async getOnlineFriends(@Param('id') id: number)
    // {
    //     return await this.userService.onlineFriends(id);
    // }
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

    @Get('game/history/:userId/:toTake')
    async getGameHistory(@Param('userId', ParseIntPipe) userId: number, @Param('toTake', ParseIntPipe) toTake: number) {
        return await this.userService.getGameHistory(userId, toTake)
    }

    @Get('2fa/turn-on/:id')
    @UseGuards(JwtGuard)
    async turnOn2fa(@Param('id') id: number, @Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.findUserById(id);
        user.is_two_factor = true;
        await this.userService.saveUser(user);
        return res.status(200).send('two factor was turned on')
    }

    @Post('2fa/turn-off/:id')
    @UseGuards(JwtGuard)
    async turnOff2fa(@Param('id') id: number, @Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.findUserById(id);
        const isCodeValid = this.userService.isUserAuthValid(
            req.body.token,
            user
        );
        if(!isCodeValid)
            return res.status(200).send('two factor token is invalid');
        user.two_factor_secret = null;
        user.otpPathUrl = null;
        user.is_two_factor = false;
        await this.userService.saveUser(user);
        return res.status(200).send('');
    }

    @Get('2fa/isTurnedOn/:id')
    @UseGuards(JwtGuard)
    async isTurned2fa(@Param('id') id: number, @Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.findUserById(id);
        if(await this.userService.userHasAuth(user) === true)
            return res.status(200).send(true);
        else
            return res.status(200).send(false);
    }
    
    @Post('2fa/login/:id')
    @UseGuards(JwtGuard)
    async login2fa(@Req() req: Request, @Res() res: Response, @Param('userId') userId: number)
    {
        console.log(userId)
        let user;
        if(isNaN(userId))
            user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        else
            user = await this.userService.findUserById(userId);
        const isCodeValid = this.userService.isUserAuthValid(
            req.body.token,
            user
        );
        if(!isCodeValid)
            return res.status(200).send('two factor token is invalid');
        return res.status(200).send('');
    }

    @Put('setUserNames/:id')
    @UseGuards(JwtGuard)
    async setUserNames(@Body() userData: userNamesDto, @Req() req: Request, @Res() res: Response,
    @Param('id', ParseIntPipe) id: number)
    {
        if(userData.firstname.length > 12)
            return res.status(200).send('firstname is too large');
        else if (userData.lastname.length > 12)
            return res.status(200).send('lastname is too large');
        else if (userData.username.length > 12)
            return res.status(200).send('username is too large');
        const user = await this.userService.findUserById(id);
        user.firstname = userData.firstname;
        user.lastname = userData.lastname;
        try {
            user.username = userData.username;
            await this.userService.saveUser(user);
        }
        catch {
            return res.status(200).send('nickname already exists');
        }
        return res.status(200).send('');
    }

    @Post('setUserData/:id')
    @UseGuards(JwtGuard)
    async postUsername(@Body() userData: userDataDto, @Req() req: Request, @Res() res: Response,
    @Param('id', ParseIntPipe) id: number)
    {
        const user = await this.userService.findUserById(id);
        if(userData.username.length === 0)
        {
            if(userData.firstname.length > 12)
                return res.status(201).send('firstname is too large');
            if(userData.lastname.length > 12)
                return res.status(201).send('lastname is too large');
            user.firstname = userData.firstname;
            user.lastname = userData.lastname;
            await this.userService.saveUser(user);
        }
        else
        {
            if(userData.username.length > 12)
                return res.status(201).send('username is too large');
            try {
                user.username = userData.username;
                await this.userService.saveUser(user);
            }
            catch (error)
            {
                return res.status(201).send('nickname is already used');
            }
        }
        return res.status(201).send('');
    }
    @Get('isFirstLog')
    @UseGuards(JwtGuard)
    async isFirstLog(@Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        return user.firstLog;
    }
    @Post('logout/:id')
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
        return res.status(200).send('');
    }

    @Patch('stat/add')
	async addUserStat(@Query() statDto: StatsDto, @Req() req) {
		await this.userService.addUserStat(statDto, req.user) 
	}

	@Get('search/user')
	async searchForUser(
		@Query() dto: searchDto,
	) {
		const { username } = dto
		const user = await this.userService.searchUser(username)
        if (!user)
            throw new NotFoundException('User not found')
        return user
	}

    @Get('user/details/:id')
    async getUserDetails(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.getUserDetails(id)
        
        if (!user )
            throw new NotFoundException('user not found')
        return user
    }

    @Get('user/profile/:username')
    async getUserProfile(@Param('username') username: string) {
        const user = await this.userService.getUserProfile(username)
        if (!user )
            throw new NotFoundException('user not found')
        return user
    }
}