// V-02: tokens are now delivered via HttpOnly cookies set by the backend.
// JavaScript cannot read or write them — the browser handles the cookie automatically.
// This class is kept as a stub so existing imports do not break during migration.
// TODO: remove all call sites and delete this file.
class TokenService {
    /** @deprecated Token is in HttpOnly cookie — not accessible from JS */
    getToken(): null {
        return null;
    }
    /** @deprecated Token is set by the backend via Set-Cookie header */
    setToken(_token: string): void {
        // no-op
    }
}

export default new TokenService();