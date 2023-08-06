import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { gameService } from './game.service';
import { userWinDto } from './dto/userWinDto';

@Controller('game')
export class gameController {
    constructor(private readonly gameService: gameService) {}

    @Post('levelUpdate')
    async updateLevel(@Body() updateLevel: userWinDto)
    {
        await this.gameService.levelUpdate(updateLevel);
    }
}
