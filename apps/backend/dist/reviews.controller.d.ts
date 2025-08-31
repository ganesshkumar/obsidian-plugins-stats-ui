export declare class ReviewsController {
    lookup(body: {
        items: {
            pluginId: string;
            version: string;
        }[];
    }): Promise<{
        results: {
            pluginId: string;
            name: any;
            version: string;
            average: number;
            count: any;
            latest: any;
        }[];
    }>;
    paginated(pluginId: string, version: string, cursor?: string, limit?: string): Promise<{
        items: any;
        nextCursor: any;
    }>;
    create(b: {
        pluginId: string;
        pluginVersion: string;
        rating: number;
        review?: string;
    }): Promise<{
        ok: boolean;
    }>;
}
