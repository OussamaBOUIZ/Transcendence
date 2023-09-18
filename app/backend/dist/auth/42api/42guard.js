"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortyTwoGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let FortyTwoGuard = class FortyTwoGuard extends (0, passport_1.AuthGuard)('42') {
};
exports.FortyTwoGuard = FortyTwoGuard;
exports.FortyTwoGuard = FortyTwoGuard = __decorate([
    (0, common_1.Injectable)()
], FortyTwoGuard);
//# sourceMappingURL=42guard.js.map