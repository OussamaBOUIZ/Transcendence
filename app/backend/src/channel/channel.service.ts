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
            newChannel.channel_owners.push(userFound.id);
            newChannel.channel_admins.push(userFound.id);
            console.log(newChannel);
            this.channelRepo.save(newChannel);
        }
        else
        {
            channelFound.channel_name = channelData.channelName;
            channelFound.channel_type = channelData.channelType;
            if(channelFound.channel_type === 'protected')
                channelFound.channel_password = channelData.channelPassword;
            this.channelRepo.save(channelFound);
        }
    }
}
