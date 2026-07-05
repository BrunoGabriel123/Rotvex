import { PrismaService } from '../../common/database/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createExpenseDto: CreateExpenseDto): Promise<{
        description: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        amount: number;
        category: string;
        date: Date;
    }>;
    findAll(companyId: string, params: {
        page?: number;
        limit?: number;
        category?: string;
    }): Promise<{
        data: {
            description: string;
            companyId: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            amount: number;
            category: string;
            date: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        description: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        amount: number;
        category: string;
        date: Date;
    }>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<{
        description: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        amount: number;
        category: string;
        date: Date;
    }>;
    remove(id: string): Promise<{
        description: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        amount: number;
        category: string;
        date: Date;
    }>;
}
