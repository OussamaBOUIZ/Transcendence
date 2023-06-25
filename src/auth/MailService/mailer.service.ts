import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailTemplate {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail() {
    const from: string = 'issamjmari098@gmail.com';
    const to: string = 'issamjmari098@gmail.com';
    const subject: string = 'Checks';
    const context: any = {name: 'issam', url: ''};
    const v = await this.mailerService.sendMail({
      from,
      to,
      subject,
      context,
    });
    console.log(v);
  }
}
