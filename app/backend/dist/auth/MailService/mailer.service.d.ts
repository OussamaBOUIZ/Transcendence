import { MailerService } from '@nestjs-modules/mailer';
export declare class MailTemplate {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(toUser: string): Promise<void>;
}
