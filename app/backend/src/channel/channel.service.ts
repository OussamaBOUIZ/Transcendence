import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/databases/channel.entity';
import { Repository } from 'typeorm';
import { User } from 'src/databases/user.entity';
import { channelAdminDto, channelOwnerDto } from './dto/channelOwnerAdminDto';
import { newUserDto } from './dto/newUserDto';

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
    async setChannelOwner(channelOwner: channelOwnerDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: channelOwner.channelName});
        if(!channelFound.channel_owners)
            channelFound.channel_owners = [];
        if(channelFound.channel_admins.includes(channelOwner.newChannelOwner))
            throw new HttpException('conflict', HttpStatus.CONFLICT);
        channelFound.channel_admins.push(channelOwner.newChannelOwner);
        this.channelRepo.save(channelFound);
    }
    async setChannelAdmin(channelAdmin: channelAdminDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: channelAdmin.channelName});
        if(!channelFound.channel_admins)
            channelFound.channel_admins = [];
        if(channelFound.channel_admins.includes(channelAdmin.newChannelAdmin))
            throw new HttpException('conflict', HttpStatus.CONFLICT);
        channelFound.channel_admins.push(channelAdmin.newChannelAdmin);
        this.channelRepo.save(channelFound);
    }
    async checkProtectedPass(newUser: newUserDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: newUser.channelName});
        if(!channelFound)
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        if(channelFound.channel_password !== newUser.providedPass)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        if(!channelFound.channel_users)
            channelFound.channel_users = [];
        if(channelFound.channel_users.includes(newUser.channelNewUser))
            throw new HttpException('conflict', HttpStatus.CONFLICT);
        channelFound.channel_users.push(newUser.channelNewUser);
        this.channelRepo.save(channelFound);
    }
    async addToPublicChannel(newUser: newUserDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: newUser.channelName});
        if(!channelFound)
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        if(!channelFound.channel_users)
            channelFound.channel_users = [];
        if(channelFound.channel_users.includes(newUser.channelNewUser))
            throw new HttpException('conflict', HttpStatus.CONFLICT);
        channelFound.channel_users.push(newUser.channelNewUser);
        this.channelRepo.save(channelFound);
    }
}
