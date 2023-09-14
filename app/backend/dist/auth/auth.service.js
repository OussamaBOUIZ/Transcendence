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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../databases/user.entity");
const argon = require("argon2");
const user_service_1 = require("../user/user.service");
const achievement_service_1 = require("../databases/achievement/achievement.service");
let AuthService = class AuthService {
    constructor(jwtService, configService, userService, achievementService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
        this.achievementService = achievementService;
    }
    async apisignin(user) {
        if (!user) {
            return null;
        }
        const userFound = await this.searchForEmail(user.email);
        if (!userFound)
            return await this.apiregisterUser(user);
        userFound.firstLog = false;
        await this.userService.saveUser(userFound);
        const secret = this.configService.get('JWT_SECRET');
        return this.jwtService.sign({
            id: userFound.id,
            email: userFound.email
        }, { secret });
    }
    async apiregisterUser(user) {
        const newUser = new user_entity_1.User();
        newUser.email = user.email;
        newUser.status = "Online";
        await this.userService.saveUser(newUser);
        this.achievementService.createAchievements(newUser);
        const secret = this.configService.get('JWT_SECRET');
        const userToken = this.jwtService.sign({
            id: newUser.id,
            email: newUser.email
        }, { secret });
        return this.jwtService.sign({
            id: newUser.id,
            email: newUser.email
        }, { secret });
    }
    async searchForEmail(email) {
        const user = await this.userService.findUserByEmail(email);
        if (user)
            return user;
        return null;
    }
    async validateUser(email, password) {
        const foundUser = await this.userService.findUserByEmail(email);
        if (!foundUser)
            return null;
        const userCorrect = await argon.verify(foundUser.password, password);
        if (!userCorrect || !foundUser.isEmailConfirmed)
            return null;
        return this.signToken(foundUser);
    }
    signToken(user) {
        const secret = this.configService.get('JWT_SECRET');
        return this.jwtService.sign({
            id: user.id,
            email: user.email
        }, { secret });
    }
    async signup(userdto) {
        const pass_hash = await argon.hash(userdto.password);
        try {
            const newUser = new user_entity_1.User();
            newUser.email = userdto.email;
            newUser.firstname = userdto.firstname;
            newUser.lastname = userdto.lastname;
            newUser.username = userdto.firstname[0] + userdto.lastname;
            newUser.password = pass_hash;
            await this.userService.saveUser(newUser);
            await this.achievementService.createAchievements(newUser);
            const secret = this.configService.get('JWT_SECRET');
            return this.jwtService.sign({
                id: newUser.id,
                email: newUser.email
            }, { secret });
        }
        catch (error) {
            return null;
        }
    }
    setResCookie(res, token) {
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        user_service_1.UserService,
        achievement_service_1.AchievementService])
], AuthService);
//# sourceMappingURL=auth.service.js.map