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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const store_1 = require("@mono/store");
const auth_guard_1 = require("./util/auth-guard");
let ReviewsController = class ReviewsController {
    async lookup(body) {
        const ids = body.items.map(i => i.pluginId);
        const plugins = await store_1.Repo.getPluginsByIds(ids);
        const results = await Promise.all(body.items.map(async (it) => {
            const latest = await store_1.Repo.latestReviews(it.pluginId, it.version, 10);
            return {
                pluginId: it.pluginId,
                name: plugins.find(p => p.pluginId === it.pluginId)?.name ?? it.pluginId,
                version: it.version,
                average: latest.length ? (latest.reduce((a, r) => a + r.rating, 0) / latest.length) : 0,
                count: latest.length,
                latest: latest.map(r => ({
                    rating: r.rating,
                    review: r.review,
                    createdAt: r.createdAt,
                    pseudoname: r.user?.pseudoname ?? 'anon'
                }))
            };
        }));
        return { results };
    }
    async paginated(pluginId, version, cursor, limit = '20') {
        const items = await store_1.Repo.paginatedReviews(pluginId, version, cursor, Number(limit));
        const nextCursor = items.length ? items[items.length - 1].id : undefined;
        return { items, nextCursor };
    }
    async create(b) {
        if (b.rating < 1 || b.rating > 5)
            throw new Error('invalid rating');
        if (b.review && b.review.length > 2048)
            throw new Error('review too long');
        const userId = global.__req_user.id;
        await store_1.Repo.createOrUpdateReview({ pluginId: b.pluginId, pluginVersion: b.pluginVersion, userId, rating: b.rating, review: b.review });
        return { ok: true };
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('plugins/lookup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "lookup", null);
__decorate([
    (0, common_1.Get)('plugins/:pluginId/:version/reviews'),
    __param(0, (0, common_1.Param)('pluginId')),
    __param(1, (0, common_1.Param)('version')),
    __param(2, (0, common_1.Query)('cursor')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "paginated", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('reviews'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, common_1.Controller)('v1')
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map