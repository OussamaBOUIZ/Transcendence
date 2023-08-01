import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/databases/channel.entity';
import { Repository } from 'typeorm';
import { User } from 'src/databases/user.entity';
import { channelAdminDto, channelOwnerDto } from './dto/channelOwnerAdminDto';
import { newUserDto } from './dto/newUserDto';
import { UserOperationDto } from './dto/operateUserDto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { type } from 'os';
import { Message } from 'src/databases/message.entity';
import { UserService } from 'src/user/user.service';
import { Muted_users } from 'src/databases/muted_users.entity';
import { muteUserDto } from './dto/muteUserDto';
import {Server} from "socket.io"


@Injectable()
export class ChannelService {
    constructor(@InjectRepository(Channel) private channelRepo: Repository<Channel>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Muted_users) private muteRepo: Repository<Muted_users>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService) {}

    async channelUpdate(channelData: channelDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: channelData.channelName});
        if(!channelFound)
        {
            const newChannel = new Channel();
            newChannel.channel_name = channelData.channelName;
            newChannel.channel_type = channelData.channelType;
            if(newChannel.channel_type === 'protected')
                newChannel.channel_password = await argon.hash(channelData.channelPassword);
            const userFound = await this.userService.findUserById(channelData.channelOwner);
            newChannel.channel_owners = [];
            newChannel.channel_owners.push(userFound.id);
            await this.channelRepo.save(newChannel);
        }
        else
        {
            if(channelData.channelName !== channelFound.channel_name)
                channelFound.channel_name = channelData.channelName;
            if(channelData.channelType !== channelFound.channel_type)
                channelFound.channel_type = channelData.channelType;
            if(channelFound.channel_type === 'protected' && channelData.channelPassword !== channelFound.channel_password)
                channelFound.channel_password = channelData.channelPassword;
            await this.channelRepo.save(channelFound);
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
    async addToChannel(newUser: newUserDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: newUser.channelName});
        if(channelFound.channel_type === 'public')
        {
            if(!channelFound.channel_users)
                channelFound.channel_users = [];
            if(channelFound.channel_users.includes(newUser.channelNewUser))
                return 'user already exists in channel';
            channelFound.channel_users.push(newUser.channelNewUser);
        }
        if(channelFound.channel_type === 'protected')
        {
            if(!channelFound.channel_users)
                channelFound.channel_users = [];
            if(!(await argon.verify(channelFound.channel_password, newUser.providedPass)))
                return 'provided password is incorrect'
            if(channelFound.channel_users.includes(newUser.channelNewUser))
                return 'user already exists in channel';
            channelFound.channel_users.push(newUser.channelNewUser);
        }
        await this.channelRepo.save(channelFound);
        return await this.channelRepo.find({
            relations: {
                messages: true
            },
            where: {
                channel_name: newUser.channelName
            },
            take: 30
        });
    }
    async kickUserFromChannel(kickUser: UserOperationDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: kickUser.channelName});
        channelFound.channel_users = channelFound.channel_users.filter((number) => number !== kickUser.userId);
        await this.channelRepo.save(channelFound);
    }
    async banUserFromChannel(banUser: UserOperationDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: banUser.channelName});
        channelFound.channel_users = channelFound.channel_users.filter((number) => number !== banUser.userId);
        if(!channelFound.banned_users)
            channelFound.banned_users = [];
        channelFound.banned_users.push(banUser.userId);
        await this.channelRepo.save(channelFound);
    }
    async promoteUserToAdmin(promoteUser: UserOperationDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: promoteUser.channelName});
        if(!channelFound)
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        if(!channelFound.channel_users)
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        if(!channelFound.channel_users.includes(promoteUser.userId))
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        if(!channelFound.channel_admins)
            channelFound.channel_admins = [];
        channelFound.channel_admins.push(promoteUser.userId);
        channelFound.channel_users = channelFound.channel_users.filter((number) => number !== promoteUser.userId);
        this.channelRepo.save(channelFound);
    }
    async storeChannelMessage(userMessage: string, channel: Channel)
    {
        const newMessage: Message = this.messageRepo.create({message: userMessage});
        newMessage.channel = channel;
        await this.messageRepo.save(newMessage);
    }
    async muteUserFromChannel(muteUser: UserOperationDto, channel: Channel)
    {
        const mutedUser: Muted_users = await this.muteRepo.findOneBy({user_id: muteUser.userId});
        if(mutedUser)
            return 'already muted';
        const mute = new Muted_users();
        mute.channel = channel;
        mute.user_id = muteUser.userId;
        await this.muteRepo.save(mute);
    }
    async unmuteUser(userId: number)
    {
        const mutedUser: Muted_users = await this.muteRepo.findOneBy({user_id: userId});
        await this.muteRepo.remove(mutedUser);
    }
    async getChannel(channelName: string)
    {
        return await this.channelRepo.findOneBy({channel_name: channelName});
    }
    async userIsMuted(userId: number)
    {
        const muted = await this.muteRepo.findOneBy({user_id: userId});
        if(muted)
            return true;
        return false;
    }
}
 