import { MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway, WebSocketServer 
  } from "@nestjs/websockets"; 
  import { Server, Socket } from 'socket.io';
import { ChatGatewayService } from "./userchat.service";

  /**
   * RxJS : 
   * 
   * ? Observable - An object responsible for handling data streams and notifying
        observers when new data arrives
    * Observer: consumers of data streams emitted by observables,
   * 
   * 
   */

        export interface User {
          userId: string
          userName: string
          socketId: string
        }

@WebSocketGateway()
export class chatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  constructor (private chatGatewayService: ChatGatewayService) {}
  private ids: string [] = []
  @WebSocketServer()
  wss: Server;
  
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: any) {
    console.log(data)
    try {
      const jsonData = JSON.parse(data);
      // Handle the parsed JSON data
      const secretRoom = jsonData[0];
      const hostSocketId = secretRoom.host.socketId;

      // Access socketId from the users array in the private JSON
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
		// this.wss.to(client.id).emit('message', data)
  }

  @SubscribeMessage('message')
  handleSendMessage(client: Socket, payload: string) {
      console.log('TODO')
    // const newMessage = this.mess
  }

  afterInit(server: any) {
    
  }

  handleConnection(client: Socket) {
    console.log('todo: check the the rights of user connected to the socket') 
    console.log(`${client} connected`)
  }

  handleDisconnect(client: any) {
      console.log('disconnected')
  }
}

