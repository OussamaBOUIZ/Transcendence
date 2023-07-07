import { Body, Controller, Get, Post } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
    constructor(private readonly channelservice: ChannelService) {}
    @Post('update')
    async updateChannel(@Body() channelData: channelDto)
    {
        await this.channelservice.channelUpdate(channelData);
    }

}
