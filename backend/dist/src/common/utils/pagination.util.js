"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationParams = getPaginationParams;
exports.createPaginatedResponse = createPaginatedResponse;
function getPaginationParams(params) {
    const page = params.page ? Math.max(1, params.page) : 1;
    const limit = params.limit ? Math.min(100, Math.max(1, params.limit)) : 10;
    const skip = (page - 1) * limit;
    const sortBy = params.sortBy || 'createdAt';
    const sortOrder = params.sortOrder || 'desc';
    return { page, limit, skip, sortBy, sortOrder };
}
function createPaginatedResponse(data, total, page, limit) {
    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}
//# sourceMappingURL=pagination.util.js.map