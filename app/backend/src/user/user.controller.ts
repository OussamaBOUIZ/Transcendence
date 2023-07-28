import {Controller, Request, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {JwtGuard} from "../auth/jwt/jwtGuard";

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Delete('delete/:id')
    // async deleteUser(@Param('id') userId: number)
    // {
    //     await this.userService.deleteUserFromDB(userId);
    // }
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findUserById(id)
    }

    @Get('stats/:userId')
    async getStatsById(
        @Param('userId', ParseIntPipe) id: number,
        @Request() req
    ) {
       return await this.userService.getStatsById(id)
    }


}
