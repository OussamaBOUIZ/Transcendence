import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Get()
    @Redirect()
    func() {
        return { url: 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-ec5788bc26ecd28aee90b99d9aca4f2003ab238b4bb6a16034d9761c0fb0d39f&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2F42api&response_type=code'};
    }
    @Get('42api')
    func2(@Query('param') param: string)
    {
        console.log(param);
        return 'success';
    }

}
