"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BlockedTokenList_service_1 = require("./BlockedTokenList.service");
const BlockedTokenList_entity_1 = require("./BlockedTokenList.entity");
let AchievementModule = class AchievementModule {
};
exports.AchievementModule = AchievementModule;
exports.AchievementModule = AchievementModule = __decorate([
    (0, common_1.Module)({
        providers: [BlockedTokenList_service_1.BlockedTokenlistService],
        imports: [typeorm_1.TypeOrmModule.forFeature([BlockedTokenList_entity_1.BlockedTokenList])]
    })
], AchievementModule);
//# sourceMappingURL=BlockedTokenList.module.js.map