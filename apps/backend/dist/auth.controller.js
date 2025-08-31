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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const store_1 = require("@mono/store");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthController = class AuthController {
    async start(body) {
        const state = Math.random().toString(36).substring(7);
        const codeVerifier = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
        const params = new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            response_type: 'code',
            scope: 'openid email profile',
            redirect_uri: `${process.env.OAUTH_REDIRECT_ORIGIN}/v1/auth/google/callback`,
            state,
            code_challenge: codeVerifier,
            code_challenge_method: 'plain'
        });
        const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        return { loginUrl };
    }
    async googleCallback(code, state) {
        const mockUserInfo = {
            sub: 'google_' + Math.random().toString(36).substring(7),
            email: 'demo@example.com'
        };
        const user = await store_1.Repo.upsertUserFromGoogle({
            sub: mockUserInfo.sub,
            email: mockUserInfo.email
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, uuid: user.uuid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const redirectUrl = `${process.env.OBSIDIAN_DEEP_LINK}?token=${token}&state=${state}`;
        return { redirect: redirectUrl };
    }
    async setPseudoname(body) {
        const userId = global.__req_user?.id;
        if (!userId)
            throw new Error('Not authenticated');
        await store_1.Repo.setPseudoname(userId, body.pseudoname);
        return { ok: true };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "start", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Post)('me/pseudoname'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setPseudoname", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('v1/auth')
], AuthController);
//# sourceMappingURL=auth.controller.js.map