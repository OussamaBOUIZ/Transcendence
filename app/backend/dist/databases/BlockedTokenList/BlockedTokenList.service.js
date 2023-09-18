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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedTokenlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const typeorm_2 = require("typeorm");
const BlockedTokenList_entity_1 = require("./BlockedTokenList.entity");
let BlockedTokenlistService = class BlockedTokenlistService {
    constructor(BlockedListRepo) {
        this.BlockedListRepo = BlockedListRepo;
    }
    async blacklistToken(token, expiresInMilliseconds) {
        const expirationDate = new Date(expiresInMilliseconds);
        const tokenEntry = this.BlockedListRepo.create({
            token: token,
            expiresAt: expirationDate,
        });
        await this.BlockedListRepo.save(tokenEntry);
    }
    async blackListHasToken(token) {
        const tokenExist = await this.BlockedListRepo.findOne({
            where: { token: token },
        });
        if (!tokenExist)
            return false;
        return true;
    }
    async cleanUpExpiredTokens() {
        const now = new Date();
        await this.BlockedListRepo.delete({
            expiresAt: (0, typeorm_2.LessThan)(now),
        });
    }
};
exports.BlockedTokenlistService = BlockedTokenlistService;
__decorate([
    (0, schedule_1.Cron)('0 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockedTokenlistService.prototype, "cleanUpExpiredTokens", null);
exports.BlockedTokenlistService = BlockedTokenlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BlockedTokenList_entity_1.BlockedTokenList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlockedTokenlistService);
//# sourceMappingURL=BlockedTokenList.service.js.map