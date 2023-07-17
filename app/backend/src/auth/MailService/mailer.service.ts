import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs'

@Injectable()
export class MailTemplate {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(toUser: string) {
    const from: string = 'issamjmari098@gmail.com';
    const to: string = 'slash.dq.99@gmail.com';
    const subject: string = 'Email confirmation';
    const htmlfile = fs.readFileSync('/Users/oouazize/Desktop/Transcendence/app/backend/src/auth/htmlSources/file.html', 'utf-8');
    console.log(`${to}`);
    const v = await this.mailerService.sendMail({
      from, 
      to,
      subject,
      html: htmlfile
    });
    console.log('SUCCESSFUL');
  }
}
