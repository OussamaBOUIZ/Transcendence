import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs'

@Injectable()
export class MailTemplate {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(toUser: string) {
    const from: string = 'transcendenceproject2023@gmail.com';
    const to: string = toUser;
    const subject: string = 'Email confirmation';
    const htmlfile = fs.readFileSync('/Users/ijmari/Desktop/Transcendence/src/auth/htmlSources/file.html');
    console.log('YES');
    const v = await this.mailerService.sendMail({
      from, 
      to,
      subject,
      html: htmlfile
    });
    console.log(v);
  }
}
