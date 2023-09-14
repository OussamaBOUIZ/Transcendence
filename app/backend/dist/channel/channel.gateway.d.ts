import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChannelService } from "./channel.service";
import { UserService } from "src/user/user.service";
import { channelMessageDto } from "./dto/channelMessageDto";
import { UserOperationDto } from "./dto/operateUserDto";
import { muteUserDto } from "./dto/muteUserDto";
import { channelAccess } from "./dto/channelAccess";
export declare class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly channelservice;
    private readonly userService;
    server: Server;
    constructor(channelservice: ChannelService, userService: UserService);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    unmuteUser(userId: number, channelservice: ChannelService, server: Server): Promise<void>;
    muteuser(user: muteUserDto, client: Socket): Promise<void>;
    createChannel(channelData: channelAccess, client: Socket): Promise<void>;
    leaveAndRemoveChannel(channelData: channelAccess, client: Socket): Promise<void>;
    leavechannel(channelData: channelAccess, client: Socket): Promise<void>;
    banuser(banData: UserOperationDto, client: Socket): Promise<void>;
    kickuser(kickData: UserOperationDto, client: Socket): Promise<void>;
    messageSend(newMessage: channelMessageDto, client: Socket): Promise<void>;
}
