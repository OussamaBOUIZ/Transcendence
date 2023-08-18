import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { ChannelService } from './channel.service';
import { Response } from 'express';
import { channelAdminDto, channelOwnerDto } from './dto/channelOwnerAdminDto';
import { UserOperationDto } from './dto/operateUserDto';

@Controller('channel')
export class ChannelController {
    constructor(private readonly channelservice: ChannelService) {}

    @Post('update')
    async updateOrCreateChannel(@Body() channelData: channelDto, @Res() res: Response)
    {
        await this.channelservice.channelUpdate(channelData);
        return res.status(HttpStatus.CREATED).send('channel was created');
    }

    @Post('promoteuser/:id')
    async promoteUserFromChannel(@Param('id', ParseIntPipe) userId: number, @Query('channelId') channelId: number
    , @Res() res: Response)
    {
        await this.channelservice.promoteMember(userId, channelId);
        res.status(HttpStatus.CREATED).send('user was promoted succesfully');
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
    @Get('publicChannels')
    async getPublicChannels()
    {
        return await this.channelservice.getPublicChannels();
    }
    @Get('publicChannels')
    async getProtectedChannels()
    {
        return await this.channelservice.getProtectedChannels();
    }
    @Get('publicChannels')
    async getPrivateChannels()
    {
        return await this.channelservice.getPrivateChannels();
    }
}
