"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailTemplate = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const fs = require("fs");
let MailTemplate = class MailTemplate {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendEmail(toUser) {
        const from = 'transcendencePro2023@outlook.com';
        const to = toUser;
        const subject = 'Email confirmation';
        const htmlfile = fs.readFileSync('/home/oouazize/Desktop/Transcendence/app/backend/src/auth/htmlSources/file.html', 'utf-8');
        console.log(`${to}`);
        const v = await this.mailerService.sendMail({
            from,
            to,
            subject,
            html: htmlfile
        });
        console.log('SUCCESSFUL');
    }
};
exports.MailTemplate = MailTemplate;
exports.MailTemplate = MailTemplate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailTemplate);
//# sourceMappingURL=mailer.service.js.map