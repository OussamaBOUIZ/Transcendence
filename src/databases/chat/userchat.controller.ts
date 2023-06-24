import { MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ChatGatewayService } from "./userchat.service";
import {UnauthorizedException, UseGuards} from "@nestjs/common";
import {GoogleAuthGuard} from "../../auth/googleapi/googleguard";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { User } from 'src/databases/user.entity';
import {JwtPayload} from "../../auth/jwt/jwtStrategy";
import {JwtGuard} from "../../auth/jwt/jwtGuard";
import {AuthGuard} from "@nestjs/passport";
import {WsGuard} from "../../auth/socketGuard/wsGuard";

  /**
   * RxJS : 
   * 
   * ? Observable - An object responsible for handling data streams and notifying
        observers when new data arrives
    * Observer: consumers of data streams emitted by observables,
   * 
   * 
   */
@WebSocketGateway()
@UseGuards(WsGuard)
export class chatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor (@InjectRepository (User) private userRepository: Repository<User>,
               private chatGatewayService: ChatGatewayService,
               private readonly jwt: JwtService, private readonly configService: ConfigService
  ) {}


  private ids: string [] = []
  @WebSocketServer()
  wss: Server;


  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: any) {
    console.log(data)
    /*try {
      const jsonData = JSON.parse(data);
      // Handle the parsed JSON data
      const secretRoom = jsonData[0];
      const hostSocketId = secretRoom.host.socketId;

      // Access socketId from the users array   the private JSON
      const users = secretRoom.users;
      for (const user of users) {
        const userSocketId = user.socketId;
        this.wss.to(userSocketId).emit('message', 'hello issam !!')
        console.log('User socketId:', userSocketId);
      }
    } catch (error) {
      // Handle parsing error
      console.error('Failed to parse JSON data:', error);
    }
		// this.chatGatewayService.returnMessage(data);
		// this.wss.to(client.id).emit('message', data)*/
  }

  // @UseGuards(WsGuard)
  @SubscribeMessage('message')
  handleSendMessage(client: Socket, payload: string) {
    console.log('TODO')
    // const newMessage = this.mess
  }

  afterInit(server: any) {
    console.log('after init called')
  }


   handleConnection(client: Socket) {
    console.log('hello welcome you are connected to socket')
    // console.log(client.handshake.headers.authorization)
    // try {
    //   const decodedToken = await this.jwt.decode(client.handshake.headers.authorization) as {id: number}
    //   console.log(decodedToken)
    //   const user = await this.userRepository.findOneBy({id: decodedToken.id})
    //   if (!user)
    //   {
    //     console.log('todo: handle if the user not exist in DB')
    //     this.wss.emit('error', new UnauthorizedException('Login first'))
    //     client.disconnect()
    //     return
    //   }
    //   console.log(user)
    //   console.log(decodedToken.id)
    //   console.log('todo: check the the rights of user connected to the socket')
    // }
    // catch (err) {
    //   console.log('unauthorized')
    //   this.wss.emit('error', err)
    // }
    // console.log(client.handshake.headers.authorization)
  }

  handleDisconnect(client: any) {
      console.log('disconnected')
  }
}

