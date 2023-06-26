import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailTemplate {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail() {
    const from: string = 'issamjmari098@gmail.com';
    const to: string = 'oussamarabi3i02@gmail.com';
    const subject: string = 'greetings';
    const text: string = 'd3iiiiiiiiiiiiiiiiiif';
    const v = await this.mailerService.sendMail({
      from,
      to,
      subject,
      text,
    });
  }
}
