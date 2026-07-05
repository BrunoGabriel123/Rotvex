import { PrismaService } from '../../common/database/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        type: string | null;
        title: string;
        companyId: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        userId: string | null;
        message: string;
        read: boolean;
    }>;
    findAll(params: {
        page?: number;
        limit?: number;
        userId?: string;
        companyId?: string;
        unreadOnly?: boolean;
    }): Promise<{
        data: {
            type: string | null;
            title: string;
            companyId: string | null;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            userId: string | null;
            message: string;
            read: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        type: string | null;
        title: string;
        companyId: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        userId: string | null;
        message: string;
        read: boolean;
    }>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        type: string | null;
        title: string;
        companyId: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        userId: string | null;
        message: string;
        read: boolean;
    }>;
    markAsRead(id: string): Promise<{
        type: string | null;
        title: string;
        companyId: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        userId: string | null;
        message: string;
        read: boolean;
    }>;
    remove(id: string): Promise<{
        type: string | null;
        title: string;
        companyId: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        userId: string | null;
        message: string;
        read: boolean;
    }>;
}
