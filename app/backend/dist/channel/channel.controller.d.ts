import { channelDto } from './dto/channelDto';
import { ChannelService } from './channel.service';
import { Response } from 'express';
import { protectedChannelDto } from './dto/protectedChannelDto';
export declare class ChannelController {
    private readonly channelservice;
    constructor(channelservice: ChannelService);
    CreateChannel(channelData: channelDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateChannel(channelData: channelDto, res: Response): Promise<Response<any, Record<string, any>>>;
    promoteUserFromChannel(userId: number, channelId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserGrade(userId: number, channelId: number): Promise<"user" | "owner" | "admin">;
    getChannelUsers(id: number): Promise<import("../databases/channel.entity").Channel>;
    getChannelNameById(id: number): Promise<string>;
    getAllChannels(id: number): Promise<import("../databases/channel.entity").Channel[]>;
    getAccessibleChannels(): Promise<import("../databases/channel.entity").Channel[]>;
    checkProtected(id: number, protectedData: protectedChannelDto): Promise<boolean | "You are already a member">;
    addToChannel(id: number, channelName: string): Promise<string>;
    getChannelMessages(id: number, userId: number): Promise<import("../databases/message.entity").Message[]>;
}
