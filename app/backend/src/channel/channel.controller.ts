import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { ChannelService } from './channel.service';
import { Response } from 'express';
import { channelAdminDto, channelOwnerDto } from './dto/channelOwnerAdminDto';
import { newUserDto } from './dto/newUserDto';
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
    @Post('setowner')
    async newChannelOwner(@Body() channelOwnerData: channelOwnerDto, @Res() res: Response)
    {
        this.channelservice.setChannelOwner(channelOwnerData);
        return res.status(HttpStatus.CREATED).send('new channel owner was set');
    }
    @Post('setadmin')
    async newChannelAdmin(@Body() channelAdminData: channelAdminDto, @Res() res: Response)
    {
        this.channelservice.setChannelAdmin(channelAdminData);
        return res.status(HttpStatus.CREATED).send('new channel admin was set');
    }
    @Post('adduser')
    async addChannelUser(@Body() addedUserData: newUserDto, @Res() res: Response) 
    {
        if(addedUserData.channelType === 'protected')
        {
            await this.channelservice.checkProtectedPass(addedUserData);
            return res.status(HttpStatus.CREATED).send('new channel user was set');
        }
        if(addedUserData.channelType === 'public')
        {
            await this.channelservice.addToPublicChannel(addedUserData);
            return res.status(HttpStatus.CREATED).send('new channel user was set');
        }
    }
    @Post('kickuser')
    async kickUserFromChannel(@Body() userKick: UserOperationDto, @Res() res: Response)
    {
        await this.channelservice.kickUserFromChannel();
    }

}
