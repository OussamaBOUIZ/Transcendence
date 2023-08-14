import { Controller  } from '@nestjs/common';
import { gameService } from './game.service';

@Controller('game')
export class gameController {
    constructor(private readonly gameService: gameService) {}

    // @Post('gameUpdate')
    // async updateLevel(@Body() updateLevel: userWinDto)
    // {
    //     await this.gameService.userGameDataUpdate(updateLevel);
    // }
}
