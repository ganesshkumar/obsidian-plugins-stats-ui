export declare class AuthController {
    start(body: {
        redirect?: string;
    }): Promise<{
        loginUrl: string;
    }>;
    googleCallback(code: string, state: string): Promise<{
        redirect: string;
    }>;
    setPseudoname(body: {
        pseudoname: string;
    }): Promise<{
        ok: boolean;
    }>;
}
