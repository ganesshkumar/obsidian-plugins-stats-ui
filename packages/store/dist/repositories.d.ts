export declare const Repo: {
    getPluginsByIds: (pluginIds: string[]) => Promise<any>;
    upsertUserFromGoogle: (params: {
        sub: string;
        email?: string | null;
    }) => Promise<any>;
    setPseudoname: (userId: string, pseudoname: string) => any;
    createOrUpdateReview: (input: {
        pluginId: string;
        pluginVersion: string;
        userId: string;
        rating: number;
        review?: string | null;
    }) => Promise<any>;
    latestReviews: (pluginId: string, pluginVersion: string, take: number) => any;
    paginatedReviews: (pluginId: string, pluginVersion: string, cursor?: string, limit?: number) => Promise<any>;
};
