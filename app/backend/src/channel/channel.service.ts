import { HttpException, Injectable } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/databases/channel.entity';
import { Repository } from 'typeorm';
import { User } from 'src/databases/user.entity';

@Injectable()
export class ChannelService {
    constructor(@InjectRepository(Channel) private channelRepo: Repository<Channel>,
    @InjectRepository(User) private userRepo: Repository<User>) {}

    async channelUpdate(channelData: channelDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: channelData.channelName});
        if(!channelFound)
        {
            const newChannel = new Channel();
            newChannel.channel_name = channelData.channelName;
            newChannel.channel_type = channelData.channelType;
            if(newChannel.channel_type === 'protected')
                newChannel.channel_password = channelData.channelPassword;
            const userFound = await this.userRepo.findOneBy({username: channelData.channelOwner});
            newChannel.channel_owners = [];
            newChannel.channel_admins = [];
            newChannel.channel_owners.push(userFound.id);
            newChannel.channel_admins.push(userFound.id);
            this.channelRepo.save(newChannel);
        }
        else
        {
            const prevChannelType = channelFound.channel_type;
            if(channelData.channelName !== channelFound.channel_name)
                channelFound.channel_name = channelData.channelName;
            if(channelData.channelType !== channelFound.channel_type)
                channelFound.channel_type = channelData.channelType;
            if(channelFound.channel_type === 'protected' && channelData.channelPassword !== channelFound.channel_password)
                channelFound.channel_password = channelData.channelPassword;
            else if (channelFound.channel_type !== 'protected')
                channelFound.channel_password = null;
            this.channelRepo.save(channelFound);
        }
    }
}
