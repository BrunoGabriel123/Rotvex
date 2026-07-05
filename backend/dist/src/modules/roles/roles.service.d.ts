import { PrismaService } from '../../common/database/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(params: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{
        data: ({
            rolePermissions: {
                permission: {
                    description: string | null;
                    name: string;
                    id: string;
                    deletedAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                    resource: string;
                    action: string;
                };
            }[];
        } & {
            description: string | null;
            name: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        rolePermissions: {
            permission: {
                description: string | null;
                name: string;
                id: string;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                resource: string;
                action: string;
            };
        }[];
    } & {
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addPermission(roleId: string, permissionId: string): Promise<{
        roleId: string;
        permissionId: string;
    }>;
    removePermission(roleId: string, permissionId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
