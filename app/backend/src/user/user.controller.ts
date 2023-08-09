
import {
	Controller,
	Header,
	Headers,
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
	HttpException, ParseFilePipe, FileTypeValidator,
	MaxFileSizeValidator,
	NotFoundException,
	Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { raw, Request, Response } from 'express'
import { createReadStream, promises as fsPromises } from 'fs';
import * as path from 'path';
import { JwtGuard } from "../auth/jwt/jwtGuard";
import { JwtService } from '@nestjs/jwt';
import { Match_history } from "../databases/match_history.entity";
import { BlockedTokenlistService } from 'src/databases/BlockedTokenList/BlockedTokenList.service';
import { StatsDto } from './dto/stats-dto';
import { GameHistoryDto } from './game-history-dto/game-history-dto';
import { searchDto } from './game-history-dto/search-dto';
import { diskStorage } from 'multer'
import { Observable, of } from 'rxjs';
import { extname } from 'path';
import { access } from 'fs/promises';
import { userDataDto } from './dto/userDataDto';


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
                console.log('interceptor')
				cb(new HttpException(`Wrong Http Method`, HttpStatus.METHOD_NOT_ALLOWED))
			}
			catch (e) {
				cb(null, filename)
			}
		}
	})
})

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService
        , private readonly jwt: JwtService
        , private readonly BlockedTokenService: BlockedTokenlistService) {}

    @Get()
    @UseGuards(JwtGuard)
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

    @Post('/:userId/upload')
	@UseInterceptors(FileInterceptor('image', multerConfig()))
	// @HttpCode(HttpStatus.CREATED)
	async uploadImage(
		@Param('userId', ParseIntPipe) id: number,
		@UploadedFile(new ParseFilePipe({
			fileIsRequired: true,
		})) image: Express.Multer.File,
		@Res() res: Response
	): Promise<Observable<Object> > {
		await this.userService.saveUserAvatarPath(id, image.path)
			// return  res.status(HttpStatus.NOT_FOUND).send('jfj')
		return of({
			imagePath: image.path,
			message: 'the avatar uploaded succesfuly'
		})
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
	@Get('avatar/:id')
	@Header('Content-Type', 'image/png')
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
			throw new NotFoundException('File not found or cannot be read.')
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
        const filename = id + '.jpg';
        const imagePath = path.join(process.cwd(), 'src/achievementImages', filename);
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
    async getFriendLastGame(@Param('friendId', ParseIntPipe) friendId: number)
    {   
        return await this.userService.getFriendLastGame(friendId);
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
            user.firstname = userData.firstname;
            user.lastname = userData.lastname;
            await this.userService.saveUser(user);
        }
        else
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
        return res.redirect('http://localhost:5137/');
    }

    @Patch('stat/add')
	async addUserStat(@Query() statDto: StatsDto, @Req() req: Request) {
		await this.userService.addUserStat(statDto, req.user)
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
	async searchForUser(@Query() dto: searchDto) {
		const { username } = dto
		console.log(username)
		return this.userService.searchUser(username)
	}
}

// localhost:3000/api/user/:ael÷
