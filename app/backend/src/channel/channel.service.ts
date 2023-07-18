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


@Injectable()
export class ChannelService {
    constructor(@InjectRepository(Channel) private channelRepo: Repository<Channel>,
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
    async addToProtectedChannel(newUser: newUserDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: newUser.channelName});
        if(!channelFound)
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        if(!(await argon.verify(channelFound.channel_password, newUser.providedPass)))
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        if(!channelFound.channel_users)
            channelFound.channel_users = [];
        if(channelFound.channel_users.includes(newUser.channelNewUser))
            throw new HttpException('conflict', HttpStatus.CONFLICT);
        if(!channelFound.channel_owners.includes(newUser.channelNewUser)
        && !channelFound.channel_admins.includes(newUser.channelNewUser))
        {
            channelFound.channel_users.push(newUser.channelNewUser);
            this.channelRepo.save(channelFound);
        }
        else
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    async addToChannel(newUser: newUserDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: newUser.channelName});
        if(channelFound.channel_type === 'public')
        {
            if(!channelFound.channel_users)
                channelFound.channel_users = [];
            channelFound.channel_users.push(newUser.channelNewUser);
        }
        if(channelFound.channel_type === 'protected')
        {
            if(!channelFound.channel_users)
                channelFound.channel_users = [];
            if(!(await argon.verify(channelFound.channel_password, newUser.providedPass)))
                return null;
            channelFound.channel_users.push(newUser.channelNewUser);
        }
        this.channelRepo.save(channelFound);
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
        if(!channelFound)
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        if(!channelFound.channel_users)
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        if(!channelFound.channel_users.includes(kickUser.userId))
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        if(!channelFound.channel_owners.includes(kickUser.userId)
        && !channelFound.channel_admins.includes(kickUser.userId))
        {
            channelFound.channel_users = channelFound.channel_users.filter((number) => number !== kickUser.userId);
            this.channelRepo.save(channelFound);
        }
        else
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    async banUserFromChannel(banUser: UserOperationDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: banUser.channelName});
        if(!channelFound)
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        if(!channelFound.channel_users)
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        if(!channelFound.channel_users.includes(banUser.userId))
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        channelFound.channel_users = channelFound.channel_users.filter((number) => number !== banUser.userId);
        if(!channelFound.channel_owners.includes(banUser.userId)
        && !channelFound.channel_admins.includes(banUser.userId))
        {
            if(!channelFound.banned_users)
                channelFound.banned_users = [];
            channelFound.banned_users.push(banUser.userId);
            this.channelRepo.save(channelFound);
        }
        else
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
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
    async storeChannelMessage(userMessage: string, channelName: string)
    {
        const newMessage: Message = new Message();
        newMessage.message = userMessage;
        const channel: Channel = await this.channelRepo.findOneBy({channel_name: channelName});
        if(!channel.messages)
            channel.messages = [];
        channel.messages.push(newMessage);
        this.channelRepo.save(channel);
    }
}
