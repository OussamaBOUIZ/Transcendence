import { Injectable } from '@nestjs/common';
import { channelDto } from './dto/channelDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/databases/channel.entity';
import { Repository } from 'typeorm';
import { channelAdminDto, channelOwnerDto } from './dto/channelOwnerAdminDto';
import { newUserDto } from './dto/newUserDto';
import { UserOperationDto } from './dto/operateUserDto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { Message } from 'src/databases/message.entity';
import { UserService } from 'src/user/user.service';
import { Muted_users } from 'src/databases/muted_users.entity';


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
            userFound.ownerRoleChannels = [...userFound.ownerRoleChannels, newChannel];
            await this.userService.saveUser(userFound); 
            newChannel.channelOwners = [userFound];
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
        const user = await this.userService.findUserById(channelOwner.newChannelOwner);
        user.userRoleChannels = user.userRoleChannels.filter((currentChannel) => currentChannel !== channelFound);
        user.adminRoleChannels = user.adminRoleChannels.filter((currentChannel) => currentChannel !== channelFound);
        user.ownerRoleChannels = [...user.ownerRoleChannels, channelFound];
        await this.userService.saveUser(user);
        channelFound.channelUsers = channelFound.channelUsers.filter((currentUser) => currentUser !== user);
        channelFound.channelAdmins = channelFound.channelAdmins.filter((currentUser) => currentUser !== user);
        channelFound.channelOwners = [...channelFound.channelOwners, user];
        await this.channelRepo.save(channelFound);
    }
    async setChannelAdmin(channelAdmin: channelAdminDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: channelAdmin.channelName});
        const user = await this.userService.findUserById(channelAdmin.newChannelAdmin);
        user.userRoleChannels = user.userRoleChannels.filter((currentChannel) => currentChannel !== channelFound);
        user.ownerRoleChannels = user.ownerRoleChannels.filter((currentChannel) => currentChannel !== channelFound);
        user.adminRoleChannels = [...user.adminRoleChannels, channelFound];
        await this.userService.saveUser(user);
        channelFound.channelUsers = channelFound.channelUsers.filter((currentUser) => currentUser !== user);
        channelFound.channelOwners = channelFound.channelOwners.filter((currentUser) => currentUser !== user);
        channelFound.channelAdmins = [...channelFound.channelAdmins, user];
        await this.channelRepo.save(channelFound);
    }
    async addToChannel(newUser: newUserDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: newUser.channelName});
        if(channelFound.channel_type === 'public')
        {
            const user = await this.userService.findUserById(newUser.channelNewUser);
            user.userRoleChannels = [...user.userRoleChannels, channelFound];
            await this.userService.saveUser(user);
            channelFound.channelUsers = [...channelFound.channelUsers, user];
        }
        if(channelFound.channel_type === 'protected')
        {
            if(!(await argon.verify(channelFound.channel_password, newUser.providedPass)))
                return 'provided password is incorrect'
            const user = await this.userService.findUserById(newUser.channelNewUser);
            user.userRoleChannels = [...user.userRoleChannels, channelFound];
            await this.userService.saveUser(user);
            channelFound.channelUsers = [...channelFound.channelUsers, user];
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
        const user = await this.userService.findUserById(kickUser.userId);
        user.userRoleChannels =  user.userRoleChannels.filter((currentChannel) => currentChannel !== channelFound);
        await this.userService.saveUser(user);
        channelFound.channelUsers = channelFound.channelUsers.filter((currentUser) => currentUser !== user);
        await this.channelRepo.save(channelFound);
    }
    async banUserFromChannel(banUser: UserOperationDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: banUser.channelName});
        const user = await this.userService.findUserById(banUser.userId);
        user.userRoleChannels =  user.userRoleChannels.filter((currentChannel) => currentChannel !== channelFound);
        user.userBannedChannels = [...user.userBannedChannels, channelFound];
        await this.userService.saveUser(user);
        channelFound.channelUsers = channelFound.channelUsers.filter((currentUser) => currentUser !== user);
        channelFound.BannedUsers = [...channelFound.BannedUsers, user];
        await this.channelRepo.save(channelFound);
    }
    async promoteUserToAdmin(promoteUser: UserOperationDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: promoteUser.channelName});
        const user = await this.userService.findUserById(promoteUser.userId);
        user.userRoleChannels =  user.userRoleChannels.filter((currentChannel) => currentChannel !== channelFound);
        user.adminRoleChannels = [...user.adminRoleChannels, channelFound];
        await this.userService.saveUser(user);
        channelFound.channelAdmins = [...channelFound.channelAdmins, user];
        channelFound.channelUsers = channelFound.channelUsers.filter((currentUser) => currentUser !== user);
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
    async getChannelData(id: number)
    {
        const channel = await this.channelRepo.findOne({
            relations: {
                channelAdmins: {
                    stat: true,
                },
                channelOwners: {
                    stat: true,
                },
                channelUsers: {
                    stat: true,
                },
            },
            where: {id: id},
            select: {
                channelAdmins: {
                    stat: {
                        wins: true,
                        losses: true,
                    }
                },
                channelOwners: {
                    stat: {
                        wins: true,
                        losses: true,
                    }
                },
                channelUsers: {
                    stat: {
                        wins: true,
                        losses: true,
                    }
                }
            }
        });
        return channel;
    }
}
 