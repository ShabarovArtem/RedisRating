export default class ApiError extends Error {
    constructor(public status: number, public msg: string) {
        super(msg);
    }

    static BadRequest(msg: string) {
        return new ApiError(400, msg);
    }

    static Unauthorized(msg: string) {
        return new ApiError(401, msg);
    }

    static Forbidden(msg: string) {
        return new ApiError(403, msg);
    }

    static NotFound(msg: string) {
        return new ApiError(404, msg);
    }

    static Conflict(msg: string) {
        return new ApiError(409, msg);
    }

    static Internal(msg: string) {
        return new ApiError(500, msg);
    }
}
