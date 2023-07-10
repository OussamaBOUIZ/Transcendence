import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs'

@Injectable()
export class MailTemplate {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail() {
    const from: string = 'issamjmari098@gmail.com';
    const to: string = 'oussamabouizgarne861@gmail.com';
    const subject: string = 'greetings';
    const htmlfile = fs.readFileSync('/Users/ijmari/Desktop/Transcendence/src/auth/htmlSources/file.html');
    const v = await this.mailerService.sendMail({
      from, 
      to,
      subject,
      html: htmlfile
    });
  }
}
