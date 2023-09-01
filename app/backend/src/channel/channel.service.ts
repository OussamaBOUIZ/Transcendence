import { Injectable, UseFilters } from '@nestjs/common';
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
import { Socket } from 'dgram';
import { channelMessageDto } from './dto/channelMessageDto';
import { protectedChannelDto } from './dto/protectedChannelDto';


@Injectable()
export class ChannelService {
    constructor(@InjectRepository(Channel) private channelRepo: Repository<Channel>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Muted_users) private muteRepo: Repository<Muted_users>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService) {}

    async findChannelWithMembers(channelName: string)
    {
        return await this.channelRepo.findOne({
            where: {channel_name: channelName},
            relations: {
                channelUsers: true,
                channelAdmins: true,
                channelOwners: true,
            }
        });
    }

    async findChannelBannedMembers(channelName: string)
    {
        return await this.channelRepo.findOne({
            where: {channel_name: channelName},
            relations: {
                BannedUsers: true,
            }
        });
    }
    async channelCreate(channelData: channelDto)
    {
        const channelFound = await this.channelRepo.findOne({
            where: {channel_name: channelData.channelName},
            relations: {
                channelOwners: true,
            }
        });
        if(!channelFound)
        {
            const newChannel = new Channel();
            newChannel.channel_name = channelData.channelName;
            newChannel.channel_type = channelData.channelType;
            if(newChannel.channel_type === 'protected')
                newChannel.channel_password = await argon.hash(channelData.channelPassword);
            const userFound = await this.userService.findUserById(channelData.channelOwner);
            newChannel.channelOwners = [userFound];
            await this.channelRepo.save(newChannel);
        }
    }
    async channelUpdate(channelData: channelDto)
    {
        const channelFound = await this.channelRepo.findOne({
            where: {channel_name: channelData.prevChannelName},
            relations: {
                channelOwners: true,
            }
        });
        channelFound.channel_name = channelData.channelName;
        channelFound.channel_type = channelData.channelType;
        if(channelFound.channel_type === 'protected')
            channelFound.channel_password = await argon.hash(channelData.channelPassword);
        await this.channelRepo.save(channelFound);
    }

    async addToChannel(newUser: newUserDto)
    {
        const channelFound = await this.channelRepo.findOneBy({channel_name: newUser.channelName});
        if(channelFound.channel_type === 'public')
        {
            const user = await this.userService.findUserById(newUser.channelNewUser);
            channelFound.channelUsers = channelFound.channelUsers !== null && channelFound.channelUsers !== undefined ?
            [...channelFound.channelUsers, user] : [user];
        }
        if(channelFound.channel_type === 'protected')
        {
            if(!(await argon.verify(channelFound.channel_password, newUser.providedPass)))
                return 'provided password is incorrect'
            const user = await this.userService.findUserById(newUser.channelNewUser);
            channelFound.channelUsers = channelFound.channelUsers !== null && channelFound.channelUsers !== undefined ?
            [...channelFound.channelUsers, user] : [user];
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

    async getLatestMessages(channelId: number, userId: number)
    {
        console.log(userId)
        const user = await this.userService.findUserWithBanned(userId);
        if(user.userBannedChannels.some(channel => channel.id === channelId))
            return [];
        const latestMessages = await this.messageRepo.find({
            relations: {
                channel: true,
            },
            where: {channel: {id: channelId}},
            order: {CreatedAt: 'DESC'},
            take: 40,
            select: {
                id: true,
                message: true,
                fromUser: true,
                CreatedAt: true
            }
        });
        return latestMessages.reverse();
    }
    async kickUserFromChannel(kickUser: UserOperationDto)
    {
        const channelFound = await this.findChannelWithMembers(kickUser.channelName);
        const user = await this.userService.findUserById(kickUser.userId);
        if(channelFound !== null && channelFound !== undefined && channelFound.channelUsers.length !== 0
            && channelFound.channelUsers.some(user => user.id === kickUser.userId))
            channelFound.channelUsers = channelFound.channelUsers.filter((currentUser) => currentUser.id !== user.id);
        if(channelFound !== null && channelFound !== undefined && channelFound.channelAdmins.length !== 0
            && channelFound.channelAdmins.some(user => user.id === kickUser.userId))
            channelFound.channelAdmins = channelFound.channelAdmins.filter((currentUser) => currentUser.id !== user.id);
        await this.channelRepo.save(channelFound);
    }
    async banUserFromChannel(banUser: UserOperationDto)
    {
        const channelFound = await this.findChannelBannedMembers(banUser.channelName);
        const user = await this.userService.findUserById(banUser.userId);
        channelFound.BannedUsers = channelFound.BannedUsers !== null ? [...channelFound.BannedUsers, user] : [user];
        await this.channelRepo.save(channelFound);
    }
    async promoteMember(userId: number, channelId: number)
    {
        const user = await this.userService.findUserById(userId);
        const channel = await this.channelRepo.findOne({
            where: {id: channelId},
            relations: {
                channelAdmins: true,
                channelOwners: true,
                channelUsers: true,
            },
        });
        if(channel.channelUsers && channel.channelUsers.some(user => user.id === userId))
        {
            channel.channelUsers = channel.channelUsers.filter((currentUser) => currentUser.id !== user.id);
            channel.channelAdmins = channel.channelAdmins !== null && channel.channelAdmins !== undefined ?
                                    [...channel.channelAdmins, user] : [user]; 
        }
        else if(channel.channelAdmins && channel.channelAdmins.some(user => user.id === userId))
        {
            channel.channelAdmins = channel.channelAdmins.filter((currentUser) => currentUser.id !== user.id);
            channel.channelOwners = channel.channelOwners !== null && channel.channelOwners !== undefined ?
                                    [...channel.channelOwners, user] : [user]; 
        }
        await this.channelRepo.save(channel);
    }
    async storeChannelMessage(messageData: channelMessageDto, channel: Channel)
    {
        const newMessage: Message = this.messageRepo.create({message: messageData.message});
        newMessage.channel = channel;
        newMessage.fromUser = messageData.fromUser;
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

    async getPublicChannels()
    {
        const type = 'public';
        const publicChannels = await this.channelRepo.find({
            where: {channel_type: type}
        });
        return publicChannels;
    }
    async getProtectedChannels()
    {
        const type = 'protected';
        const protectedChannels = await this.channelRepo.find({
            where: {channel_type: type}
        });
        return protectedChannels;
    }
    async getPrivateChannels()
    {
        const type = 'private';
        const privateChannels = await this.channelRepo.find({
            where: {channel_type: type}
        });
        return privateChannels;
    }
    async userIsBanned(channelName: string, userId: number)
    {
        const channel = await this.findChannelBannedMembers(channelName);
        if(channel !== null && channel.BannedUsers !== null && channel.BannedUsers.some(user => user.id === userId))
            return true;
        return false;
    }

    async userIsMuted(userId: number)
    {
        const muted = await this.muteRepo.findOneBy({user_id: userId});
        if(muted)
            return true;
        return false;
    }

    async leaveChannel(channelName: string, userId: number)
    {
        const channel = await this.channelRepo.findOne({
            where: {channel_name: channelName},
            relations: {
                channelUsers: true,
                channelAdmins: true
            },
        });
        if(channel.channelAdmins.some(user => user.id === userId))
        {
            const user = await this.userService.findUserById(userId);
            if(channel.channelAdmins !== null)
                channel.channelAdmins = channel.channelAdmins.filter(user => user.id !== userId)
        }
        else if(channel.channelUsers.some(user => user.id === userId))
        {
            if(channel.channelUsers !== null)
                channel.channelUsers = channel.channelUsers.filter(user => user.id !== userId)
        }
        await this.channelRepo.save(channel);
    }
    
    async getChannelData(id: number)
    {
        const channel = await this.channelRepo.findOne({
            where: {id: id},
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
            select: {
                id: true,
                channelAdmins: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    stat: {
                        wins: true,
                        losses: true,
                    }
                },
                channelOwners: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    stat: {
                        wins: true,
                        losses: true,
                    }
                },
                channelUsers: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    stat: {
                        wins: true,
                        losses: true,
                    }
                }
            }
        });

        return channel;
    }
    async getChannelName(channelId: number)
    {
        const channel = await this.channelRepo.findOne({
            where: {id: channelId},
        });
        return channel.channel_name;
    }
    async getUserGrade(userId: number, channelId: number)
    {
        const channel = await this.channelRepo.findOne({
            where: {id: channelId},
            relations: {
                channelAdmins: true,
                channelUsers: true,
                channelOwners: true,
            },
        });
        if(channel.channelOwners.some(user => user.id === userId))
            return 'owner';
        else if(channel.channelAdmins.some(user => user.id === userId))
            return 'admin';
        else if(channel.channelUsers.some(user => user.id === userId))
            return 'user';
    }
    async getAllChannels(id: number)
    {
        const user = await this.userService.findUserWithChannels(id);
        const AllChannels = [...user.userRoleChannels, ...user.adminRoleChannels, ...user.ownerRoleChannels];
        return AllChannels;
    }

    async getAccessibleChannels()
    {
        return await this.channelRepo.find({
            where: [
                { channel_type: 'public' },
                { channel_type: 'protected' },
            ],
            select: {
                id: true,
                channel_name: true,
                channel_type: true,
            }
        });
    }
    
    async checkProtectedChannel(channelData: protectedChannelDto, userId)
    {
        const user = await this.userService.findUserWithChannels(userId);
        if(user.ownerRoleChannels.some(channel => channel.channel_name === channelData.channelName))
            return 'You are already a member';
        else if(user.adminRoleChannels.some(channel => channel.channel_name === channelData.channelName))
            return 'You are already a member';
        else if(user.userRoleChannels.some(channel => channel.channel_name === channelData.channelName))
            return 'You are already a member';
        const channel = await this.channelRepo.findOne({
            where: {channel_name: channelData.channelName},
        });
        const checkPassword = await argon.verify(channel.channel_password, channelData.channelPassword);
        console.log(checkPassword);
        if(!checkPassword)
            return false;
        return true;
    }

    async addUserToChannel(userId: number, channelName: string)
    {
        const user = await this.userService.findUserWithChannels(userId);
        if(user.ownerRoleChannels.some(channel => channel.channel_name === channelName))
            return 'You are already a member';
        else if(user.adminRoleChannels.some(channel => channel.channel_name === channelName))
            return 'You are already a member';
        else if(user.userRoleChannels.some(channel => channel.channel_name === channelName))
            return 'You are already a member';
        const channel = await this.channelRepo.findOne({
            where: {channel_name: channelName},
            relations: {
                channelUsers: true,
            },
        });
        channel.channelUsers = channel.channelUsers !== null ? [...channel.channelUsers, user] : [user]; 
        await this.channelRepo.save(channel);
        return null;
    }
}
 