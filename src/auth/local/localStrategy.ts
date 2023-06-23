import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string, done: any): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if(!user) done(null, false);
    return done(null, user);
  }
}