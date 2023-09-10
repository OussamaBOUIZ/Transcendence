import { BadRequestException, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { ChannelService } from './channel.service';
import { Response } from 'express';
import { channelAdminDto, channelOwnerDto } from './dto/channelOwnerAdminDto';
import { UserOperationDto } from './dto/operateUserDto';
import { protectedChannelDto } from './dto/protectedChannelDto';
import { Console, log } from 'console';

@Controller('channel')
export class ChannelController {    
    constructor(private readonly channelservice: ChannelService) {}

    @Post('create') 
    async CreateChannel(@Body() channelData: channelDto, @Res() res: Response)
    {
        const ret = await this.channelservice.channelCreate(channelData);
        if(typeof ret === 'string')
            return res.status(HttpStatus.OK).send(ret);
        return res.status(HttpStatus.CREATED).send('');
    }

    @Post('update')
    async updateChannel(@Body() channelData: channelDto, @Res() res: Response)
    {
        const ret = await this.channelservice.channelUpdate(channelData);
        if(typeof ret === 'string')
            return res.status(HttpStatus.OK).send(ret);
        return res.status(HttpStatus.CREATED).send('');
    }

    @Post('promoteuser/:id') 
    async promoteUserFromChannel(@Param('id', ParseIntPipe) userId: number, @Query('channelId') channelId: number
    , @Res() res: Response)
    {
        const ret = await this.channelservice.promoteMember(userId, channelId);
        if(typeof ret === 'string')
        {
            console.log('HERE BANNNED');
            return res.status(HttpStatus.OK).send('user is banned');
        }
        return res.status(HttpStatus.CREATED).send('');
    }
    @Get('userGrade/:id')
    async getUserGrade(@Param('id', ParseIntPipe) userId: number, @Query('channelId') channelId: number)
    {
        return await this.channelservice.getUserGrade(userId, channelId);
    }

    @Get('channelData/:id')
    async getChannelUsers(@Param('id', ParseIntPipe) id: number)
    {
        return await this.channelservice.getChannelData(id);
    }
    @Get('channelName/:id')
    async getChannelNameById(@Param('id', ParseIntPipe) id: number)
    {
        return await this.channelservice.getChannelName(id);
    }
    @Get('AllChannels/:id')
    async getAllChannels(@Param('id', ParseIntPipe) id: number)
    {
        return await this.channelservice.getAllChannels(id);
    }

    @Get('AccessibleChannels')
    async getAccessibleChannels()
    {
        return await this.channelservice.getAccessibleChannels();
    }
    
    @Post('checkProtected/:id')
    async checkProtected(@Param('id', ParseIntPipe) id: number, @Body() protectedData: protectedChannelDto)
    {
        const protectedIsValid = await this.channelservice.checkProtectedChannel(protectedData, id);
        if(typeof protectedIsValid ===  'string')
            return protectedIsValid;
        if(protectedIsValid === true)
            await this.channelservice.addUserToChannel(id, protectedData.channelName);
        return protectedIsValid;
    }


    @Get('addToChannel/:id')
    async addToChannel(@Param('id', ParseIntPipe) id: number, @Query('channelName') channelName: string)
    {
        if(channelName == 'undefined')
            throw new BadRequestException('channel was not specified');
        console.log('HERE')
        const ret = await this.channelservice.addUserToChannel(id, channelName);
        return ret;
    }
    @Get('loadMessages/:id')
    async getChannelMessages(@Param('id', ParseIntPipe) id: number, @Query('userId', ParseIntPipe) userId: number)
    {
        return await this.channelservice.getLatestMessages(id, userId);
    }
}
