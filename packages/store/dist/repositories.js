var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from './client';
export const Repo = {
    getPluginsByIds: (pluginIds) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.plugin.findMany({
            where: { pluginId: { in: pluginIds } },
            select: { pluginId: true, name: true }
        });
    }),
    upsertUserFromGoogle: (params) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const now = Date.now();
        return prisma.user.upsert({
            where: { googleSub: params.sub },
            update: { updatedAt: now, email: (_a = params.email) !== null && _a !== void 0 ? _a : undefined },
            create: {
                uuid: crypto.randomUUID(),
                googleSub: params.sub,
                email: (_b = params.email) !== null && _b !== void 0 ? _b : undefined,
                createdAt: now,
                updatedAt: now
            }
        });
    }),
    setPseudoname: (userId, pseudoname) => prisma.user.update({ where: { id: userId }, data: { pseudoname, updatedAt: Date.now() } }),
    createOrUpdateReview: (input) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const now = Date.now();
        const review = yield prisma.review.upsert({
            where: { pluginId_pluginVersion_userId: Object.assign({}, input) },
            update: { rating: input.rating, review: (_a = input.review) !== null && _a !== void 0 ? _a : null, updatedAt: now },
            create: Object.assign(Object.assign({}, input), { review: (_b = input.review) !== null && _b !== void 0 ? _b : null, createdAt: now, updatedAt: now })
        });
        // naive aggregate maintenance (optional)
        const agg = yield prisma.ratingAggregate.findUnique({
            where: { pluginId_pluginVersion: { pluginId: input.pluginId, pluginVersion: input.pluginVersion } }
        });
        if (!agg) {
            yield prisma.ratingAggregate.create({
                data: {
                    pluginId: input.pluginId,
                    pluginVersion: input.pluginVersion,
                    count: 1,
                    sum: input.rating,
                    average: input.rating,
                    updatedAt: now
                }
            });
        }
        else {
            // Cheap recompute (avoid drift): compute from reviews for that version
            const { _avg, _sum, _count } = yield prisma.review.aggregate({
                where: { pluginId: input.pluginId, pluginVersion: input.pluginVersion },
                _avg: { rating: true },
                _sum: { rating: true },
                _count: { rating: true }
            });
            yield prisma.ratingAggregate.update({
                where: { pluginId_pluginVersion: { pluginId: input.pluginId, pluginVersion: input.pluginVersion } },
                data: {
                    count: (_c = _count.rating) !== null && _c !== void 0 ? _c : 0,
                    sum: (_d = _sum.rating) !== null && _d !== void 0 ? _d : 0,
                    average: (_e = _avg.rating) !== null && _e !== void 0 ? _e : 0,
                    updatedAt: now
                }
            });
        }
        return review;
    }),
    latestReviews: (pluginId, pluginVersion, take) => prisma.review.findMany({
        where: { pluginId, pluginVersion },
        orderBy: { createdAt: 'desc' },
        take,
        select: {
            rating: true,
            review: true,
            createdAt: true,
            user: { select: { pseudoname: true } }
        }
    }),
    paginatedReviews: (pluginId_1, pluginVersion_1, cursor_1, ...args_1) => __awaiter(void 0, [pluginId_1, pluginVersion_1, cursor_1, ...args_1], void 0, function* (pluginId, pluginVersion, cursor, limit = 20) {
        return prisma.review.findMany(Object.assign({ where: { pluginId, pluginVersion }, orderBy: { createdAt: 'desc' }, take: limit }, (cursor ? { skip: 1, cursor: { id: cursor } } : {})));
    })
};
