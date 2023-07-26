import { Controller, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Delete('delete/:id')
    async deleteUser(@Param('id') userId: number)
    {
        await this.userService.deleteUserFromDB(userId);
    }
    

}
