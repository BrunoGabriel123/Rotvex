export declare class BaseResponseDto<T> {
    data: T;
    message: string;
    constructor(data: T, message?: string);
}
export declare class PaginatedResponseDto<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    constructor(data: T[], meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    });
}
