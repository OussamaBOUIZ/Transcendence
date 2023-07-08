import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { ChannelService } from './channel.service';
import { Response } from 'express';

@Controller('channel')
export class ChannelController {
    constructor(private readonly channelservice: ChannelService) {}
    @Post('update')
    async updateOrCreateChannel(@Body() channelData: channelDto, @Res() res: Response)
    {
        await this.channelservice.channelUpdate(channelData);
        return res.status(HttpStatus.CREATED).send('channel was created');
    }
    async setChannelAsOwner(@Body() channelOwnerData: channelOwnerDto)
    {
        
    } 

}
