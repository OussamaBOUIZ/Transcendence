import { IVerifyOptions, Strategy, VerifyFunction } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string, done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if(!user)
      done(null, false);
    done(null, user);
  }

  
}