import { Repository } from "typeorm"
import { User } from "./user.entity"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserRepository extends Repository<User>
{
}