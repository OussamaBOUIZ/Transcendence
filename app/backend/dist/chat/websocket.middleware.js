"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const SocketAuthMiddleware = (userService) => {
    return async (client, next) => {
        try {
            const { auth } = client.handshake;
            const token = auth.token || client.handshake.headers.authorization;
            client.data.user = await userService.getUserFromJwt(token);
            if (client.data.user == null)
                throw new common_1.UnauthorizedException();
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.SocketAuthMiddleware = SocketAuthMiddleware;
//# sourceMappingURL=websocket.middleware.js.map