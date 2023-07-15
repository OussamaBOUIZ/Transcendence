import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User_chat} from "./userchat.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserchatRepositryService {
    constructor(@InjectRepository(User_chat) private chatRepository: Repository<User_chat>)
    {}
    async getAllMessages(id: number): Promise<User_chat[] | undefined> {
        return await this.chatRepository.find({
            relations: {
                messages: true
            },
            where : {
                sender_id: id
            },
            take: 30
        })
    }
}
