"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    console.log('Starting database seed...');
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
            description: 'Administrator with full access',
        },
    });
    const managerRole = await prisma.role.upsert({
        where: { name: 'manager' },
        update: {},
        create: {
            name: 'manager',
            description: 'Manager with operational access',
        },
    });
    const driverRole = await prisma.role.upsert({
        where: { name: 'driver' },
        update: {},
        create: {
            name: 'driver',
            description: 'Driver with limited access',
        },
    });
    const operatorRole = await prisma.role.upsert({
        where: { name: 'operator' },
        update: {},
        create: {
            name: 'operator',
            description: 'Operator with dispatch access',
        },
    });
    const permissions = [
        {
            name: 'users:create',
            resource: 'users',
            action: 'create',
            description: 'Create users',
        },
        {
            name: 'users:read',
            resource: 'users',
            action: 'read',
            description: 'Read users',
        },
        {
            name: 'users:update',
            resource: 'users',
            action: 'update',
            description: 'Update users',
        },
        {
            name: 'users:delete',
            resource: 'users',
            action: 'delete',
            description: 'Delete users',
        },
        {
            name: 'roles:create',
            resource: 'roles',
            action: 'create',
            description: 'Create roles',
        },
        {
            name: 'roles:read',
            resource: 'roles',
            action: 'read',
            description: 'Read roles',
        },
        {
            name: 'roles:update',
            resource: 'roles',
            action: 'update',
            description: 'Update roles',
        },
        {
            name: 'roles:delete',
            resource: 'roles',
            action: 'delete',
            description: 'Delete roles',
        },
        {
            name: 'vehicles:create',
            resource: 'vehicles',
            action: 'create',
            description: 'Create vehicles',
        },
        {
            name: 'vehicles:read',
            resource: 'vehicles',
            action: 'read',
            description: 'Read vehicles',
        },
        {
            name: 'vehicles:update',
            resource: 'vehicles',
            action: 'update',
            description: 'Update vehicles',
        },
        {
            name: 'vehicles:delete',
            resource: 'vehicles',
            action: 'delete',
            description: 'Delete vehicles',
        },
        {
            name: 'drivers:create',
            resource: 'drivers',
            action: 'create',
            description: 'Create drivers',
        },
        {
            name: 'drivers:read',
            resource: 'drivers',
            action: 'read',
            description: 'Read drivers',
        },
        {
            name: 'drivers:update',
            resource: 'drivers',
            action: 'update',
            description: 'Update drivers',
        },
        {
            name: 'drivers:delete',
            resource: 'drivers',
            action: 'delete',
            description: 'Delete drivers',
        },
        {
            name: 'orders:create',
            resource: 'orders',
            action: 'create',
            description: 'Create orders',
        },
        {
            name: 'orders:read',
            resource: 'orders',
            action: 'read',
            description: 'Read orders',
        },
        {
            name: 'orders:update',
            resource: 'orders',
            action: 'update',
            description: 'Update orders',
        },
        {
            name: 'orders:delete',
            resource: 'orders',
            action: 'delete',
            description: 'Delete orders',
        },
        {
            name: 'deliveries:create',
            resource: 'deliveries',
            action: 'create',
            description: 'Create deliveries',
        },
        {
            name: 'deliveries:read',
            resource: 'deliveries',
            action: 'read',
            description: 'Read deliveries',
        },
        {
            name: 'deliveries:update',
            resource: 'deliveries',
            action: 'update',
            description: 'Update deliveries',
        },
        {
            name: 'deliveries:delete',
            resource: 'deliveries',
            action: 'delete',
            description: 'Delete deliveries',
        },
        {
            name: 'dashboard:read',
            resource: 'dashboard',
            action: 'read',
            description: 'View dashboard',
        },
        {
            name: 'reports:read',
            resource: 'reports',
            action: 'read',
            description: 'View reports',
        },
    ];
    const createdPermissions = [];
    for (const perm of permissions) {
        const permission = await prisma.permission.upsert({
            where: { name: perm.name },
            update: {},
            create: perm,
        });
        createdPermissions.push(permission);
    }
    for (const permission of createdPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: adminRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: adminRole.id,
                permissionId: permission.id,
            },
        });
    }
    const managerPermissions = createdPermissions.filter((p) => p.resource !== 'roles' || p.action === 'read');
    for (const permission of managerPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: managerRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: managerRole.id,
                permissionId: permission.id,
            },
        });
    }
    const driverPermissions = createdPermissions.filter((p) => p.resource === 'deliveries' || p.resource === 'dashboard');
    for (const permission of driverPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: driverRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: driverRole.id,
                permissionId: permission.id,
            },
        });
    }
    const operatorPermissions = createdPermissions.filter((p) => ['orders', 'deliveries', 'drivers', 'vehicles', 'dashboard'].includes(p.resource));
    for (const permission of operatorPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: operatorRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: operatorRole.id,
                permissionId: permission.id,
            },
        });
    }
    console.log('Database seed completed successfully!');
    console.log(`Created ${4} roles and ${createdPermissions.length} permissions`);
}
seed()
    .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map