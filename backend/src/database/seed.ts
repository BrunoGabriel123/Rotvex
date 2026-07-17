import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

export async function seed() {
  console.log('Starting database seed...');

  // Create default roles
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

  const viewerRole = await prisma.role.upsert({
    where: { name: 'viewer' },
    update: {},
    create: {
      name: 'viewer',
      description: 'Read-only access for monitoring',
    },
  });

  // Create permissions
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
    {
      name: 'operations:create',
      resource: 'operations',
      action: 'create',
      description: 'Create operations',
    },
    {
      name: 'operations:read',
      resource: 'operations',
      action: 'read',
      description: 'Read operations information',
    },
    {
      name: 'operations:update',
      resource: 'operations',
      action: 'update',
      description: 'Update operations before execution',
    },
    {
      name: 'operations:plan',
      resource: 'operations',
      action: 'plan',
      description: 'Plan operations and stops',
    },
    {
      name: 'operations:assignDriver',
      resource: 'operations',
      action: 'assign_driver',
      description: 'Assign drivers to operations',
    },
    {
      name: 'operations:assignVehicle',
      resource: 'operations',
      action: 'assign_vehicle',
      description: 'Assign vehicles to operations',
    },
    {
      name: 'operations:publish',
      resource: 'operations',
      action: 'publish',
      description: 'Publish planned operations',
    },
    {
      name: 'operations:start',
      resource: 'operations',
      action: 'start',
      description: 'Start operations',
    },
    {
      name: 'operations:changeStatus',
      resource: 'operations',
      action: 'change_status',
      description: 'Change status of operations',
    },
    {
      name: 'operations:cancel',
      resource: 'operations',
      action: 'cancel',
      description: 'Cancel operations',
    },
    {
      name: 'operations:complete',
      resource: 'operations',
      action: 'complete',
      description: 'Complete operations',
    },
    {
      name: 'operations:reopen',
      resource: 'operations',
      action: 'reopen',
      description: 'Reopen closed operations',
    },
    {
      name: 'operations:overrideConflict',
      resource: 'operations',
      action: 'override_conflict',
      description: 'Override resource conflicts',
    },
    {
      name: 'operations:viewCosts',
      resource: 'operations',
      action: 'view_costs',
      description: 'View operational costs and KPIs',
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

  // Assign all permissions to admin role
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

  // Assign viewer permissions (read-only modules)
  const viewerPermissions = createdPermissions.filter(
    (p) =>
      ['dashboard', 'reports', 'operations', 'deliveries', 'orders'].includes(
        p.resource,
      ) && p.action === 'read',
  );
  for (const permission of viewerPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: viewerRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: viewerRole.id,
        permissionId: permission.id,
      },
    });
  }

  // Assign limited permissions to manager role
  const managerPermissions = createdPermissions.filter(
    (p) => p.resource !== 'roles' || p.action === 'read',
  );
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

  // Assign driver permissions
  const driverPermissions = createdPermissions.filter(
    (p) => p.resource === 'deliveries' || p.resource === 'dashboard',
  );
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

  // Assign operator permissions
  const operatorPermissions = createdPermissions.filter((p) =>
    [
      'orders',
      'deliveries',
      'drivers',
      'vehicles',
      'dashboard',
      'operations',
    ].includes(p.resource),
  );
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
  console.log(
    `Created ${4} roles and ${createdPermissions.length} permissions`,
  );

  // Create admin user
  const adminCompany = await prisma.company.upsert({
    where: { id: 'default-company' },
    update: {},
    create: {
      id: 'default-company',
      name: 'Rotvex',
      active: true,
    },
  });

  const secondaryCompany = await prisma.company.upsert({
    where: { id: 'lognorte-company' },
    update: {},
    create: {
      id: 'lognorte-company',
      name: 'LogNorte Distribuição',
      active: true,
    },
  });

  const companyId = adminCompany.id;
  const companyBId = secondaryCompany.id;

  const hashedPassword = await bcrypt.hash('admin', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@rotvex.com' },
    update: {},
    create: {
      email: 'admin@rotvex.com',
      password: hashedPassword,
      name: 'Admin',
      companyId: adminCompany.id,
      roleId: adminRole.id,
      active: true,
    },
  });

  console.log('Admin user created:');
  console.log('Email: admin@rotvex.com');
  console.log('Password: admin');

  const defaultOperationalPassword = await bcrypt.hash('senha123', 10);

  const managerUser = await prisma.user.upsert({
    where: { email: 'gestor@rotvex.com' },
    update: {
      name: 'Gestor Operacional',
      roleId: managerRole.id,
      active: true,
    },
    create: {
      email: 'gestor@rotvex.com',
      password: defaultOperationalPassword,
      name: 'Gestor Operacional',
      companyId: adminCompany.id,
      roleId: managerRole.id,
      active: true,
    },
  });

  const operatorUser = await prisma.user.upsert({
    where: { email: 'operador@rotvex.com' },
    update: {
      name: 'Operador Central',
      roleId: operatorRole.id,
      active: true,
    },
    create: {
      email: 'operador@rotvex.com',
      password: defaultOperationalPassword,
      name: 'Operador Central',
      companyId: adminCompany.id,
      roleId: operatorRole.id,
      active: true,
    },
  });

  const driverUser = await prisma.user.upsert({
    where: { email: 'motorista@rotvex.com' },
    update: {
      name: 'Motorista Referência',
      roleId: driverRole.id,
      active: true,
    },
    create: {
      email: 'motorista@rotvex.com',
      password: defaultOperationalPassword,
      name: 'Motorista Referência',
      companyId: adminCompany.id,
      roleId: driverRole.id,
      active: true,
    },
  });

  const companyBManager = await prisma.user.upsert({
    where: { email: 'gestor@lognorte.com' },
    update: {
      name: 'Gestor LogNorte',
      companyId: companyBId,
      roleId: managerRole.id,
    },
    create: {
      email: 'gestor@lognorte.com',
      password: defaultOperationalPassword,
      name: 'Gestor LogNorte',
      companyId: companyBId,
      roleId: managerRole.id,
      active: true,
    },
  });

  const companyBViewer = await prisma.user.upsert({
    where: { email: 'visualizador@lognorte.com' },
    update: {
      name: 'Visualizador LogNorte',
      companyId: companyBId,
      roleId: viewerRole.id,
    },
    create: {
      email: 'visualizador@lognorte.com',
      password: defaultOperationalPassword,
      name: 'Visualizador LogNorte',
      companyId: companyBId,
      roleId: viewerRole.id,
      active: true,
    },
  });

  console.log('Usuários operacionais criados:');
  console.log(`- ${managerUser.email} (manager)`);
  console.log(`- ${operatorUser.email} (operator)`);
  console.log(`- ${driverUser.email} (driver)`);
  console.log(`- ${companyBManager.email} (manager empresa B)`);
  console.log(`- ${companyBViewer.email} (viewer empresa B)`);

  const routesData = [
    {
      id: 'route-sp-zona-sul',
      name: 'Roteiro Zona Sul SP',
      description: 'Lojas e centros de distribuição na zona sul de São Paulo',
      status: 'active',
      companyId,
    },
    {
      id: 'route-sp-abc',
      name: 'Corredor ABC Paulista',
      description:
        'Operações industriais no eixo Santo André / São Bernardo / São Caetano',
      status: 'active',
      companyId,
    },
    {
      id: 'route-rj-metropolitana',
      name: 'Malha Metropolitana RJ',
      description: 'Clientes premium no Rio de Janeiro e Niterói',
      status: 'active',
      companyId,
    },
    {
      id: 'route-campinas-interior',
      name: 'Interior Campinas',
      description: 'Região metropolitana de Campinas e Jundiaí',
      status: 'inactive',
      companyId,
    },
  ];

  const routes = await Promise.all(
    routesData.map((route) => {
      const { id, ...data } = route;
      return prisma.route.upsert({
        where: { id },
        update: data,
        create: route,
      });
    }),
  );

  const routesCompanyB = [
    {
      id: 'route-manaus-centro',
      name: 'Manaus Centro',
      description: 'Clientes premium na região central de Manaus',
      status: 'active',
      companyId: companyBId,
    },
    {
      id: 'route-manaus-porto',
      name: 'Eixo Porto Industrial',
      description: 'Operações na zona portuária e distrito industrial',
      status: 'active',
      companyId: companyBId,
    },
  ];

  await Promise.all(
    routesCompanyB.map((route) =>
      prisma.route.upsert({
        where: { id: route.id },
        update: route,
        create: route,
      }),
    ),
  );

  const vehiclesData = [
    {
      id: 'vehicle-sprinter-01',
      plate: 'RTX1A23',
      model: 'Mercedes-Benz Sprinter 416 CDI',
      year: 2023,
      type: 'Van',
      status: 'active',
      companyId,
    },
    {
      id: 'vehicle-constellation-01',
      plate: 'RTX2B34',
      model: 'VW Constellation 17.280',
      year: 2021,
      type: 'Caminhão Toco',
      status: 'maintenance',
      companyId,
    },
    {
      id: 'vehicle-actros-01',
      plate: 'RTX3C45',
      model: 'Mercedes Actros 2651',
      year: 2020,
      type: 'Cavalo Mecânico',
      status: 'active',
      companyId,
    },
    {
      id: 'vehicle-daily-01',
      plate: 'RTX4D56',
      model: 'Iveco Daily 35-150',
      year: 2022,
      type: 'VUC',
      status: 'active',
      companyId,
    },
    {
      id: 'vehicle-hilux-01',
      plate: 'RTX5E67',
      model: 'Toyota Hilux SRV',
      year: 2019,
      type: 'Pickup',
      status: 'inactive',
      companyId,
    },
    {
      id: 'vehicle-delivery-01',
      plate: 'RTX6F78',
      model: 'VW Delivery 11.180',
      year: 2024,
      type: 'Caminhão Leve',
      status: 'active',
      companyId,
    },
  ];

  const vehicles = await Promise.all(
    vehiclesData.map((vehicle) => {
      const { id, ...data } = vehicle;
      return prisma.vehicle.upsert({
        where: { id },
        update: data,
        create: vehicle,
      });
    }),
  );

  const vehiclesCompanyB = [
    {
      id: 'vehicle-b-constellation',
      plate: 'LNB1A23',
      model: 'VW Constellation 19.320',
      year: 2022,
      type: 'Caminhão Toco',
      status: 'active',
      companyId: companyBId,
    },
    {
      id: 'vehicle-b-vuc',
      plate: 'LNB2B34',
      model: 'Iveco Daily City',
      year: 2021,
      type: 'VUC',
      status: 'maintenance',
      companyId: companyBId,
    },
  ];

  await Promise.all(
    vehiclesCompanyB.map((vehicle) =>
      prisma.vehicle.upsert({
        where: { id: vehicle.id },
        update: vehicle,
        create: vehicle,
      }),
    ),
  );

  const driversData = [
    {
      id: 'driver-joao-silva',
      name: 'João Silva',
      cpf: '12345678901',
      cnh: '00000000001',
      cnhType: 'E',
      phone: '11 98888-1122',
      status: 'active',
      companyId,
    },
    {
      id: 'driver-maria-pereira',
      name: 'Maria Pereira',
      cpf: '23456789012',
      cnh: '00000000002',
      cnhType: 'D',
      phone: '11 97777-3344',
      status: 'active',
      companyId,
    },
    {
      id: 'driver-carlos-oliveira',
      name: 'Carlos Oliveira',
      cpf: '34567890123',
      cnh: '00000000003',
      cnhType: 'E',
      phone: '11 96666-5566',
      status: 'vacation',
      companyId,
    },
    {
      id: 'driver-ana-souza',
      name: 'Ana Souza',
      cpf: '45678901234',
      cnh: '00000000004',
      cnhType: 'C',
      phone: '21 98888-7788',
      status: 'active',
      companyId,
    },
    {
      id: 'driver-lucas-santana',
      name: 'Lucas Santana',
      cpf: '56789012345',
      cnh: '00000000005',
      cnhType: 'D',
      phone: '19 97777-8899',
      status: 'inactive',
      companyId,
    },
    {
      id: 'driver-ricardo-lima',
      name: 'Ricardo Lima',
      cpf: '67890123456',
      cnh: '00000000006',
      cnhType: 'E',
      phone: '11 96565-9090',
      status: 'active',
      companyId,
    },
  ];

  const drivers = await Promise.all(
    driversData.map((driver) => {
      const { id, ...data } = driver;
      return prisma.driver.upsert({
        where: { id },
        update: data,
        create: driver,
      });
    }),
  );

  const driversCompanyB = [
    {
      id: 'driver-helena-borges',
      name: 'Helena Borges',
      cpf: '98765432100',
      cnh: '10000000001',
      cnhType: 'E',
      phone: '92 99999-1111',
      status: 'active',
      companyId: companyBId,
    },
    {
      id: 'driver-marcus-lima',
      name: 'Marcus Lima',
      cpf: '87654321098',
      cnh: '10000000002',
      cnhType: 'D',
      phone: '92 98888-2222',
      status: 'inactive',
      companyId: companyBId,
    },
  ];

  await Promise.all(
    driversCompanyB.map((driver) =>
      prisma.driver.upsert({
        where: { id: driver.id },
        update: driver,
        create: driver,
      }),
    ),
  );

  const clientsData = [
    {
      id: 'client-mercado-horizonte',
      name: 'Mercado Horizonte',
      cnpj: '12.345.678/0001-90',
      email: 'compras@mercadohorizonte.com',
      phone: '11 4002-8922',
      address: 'Av. Eng. Luís Carlos Berrini, 901',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04571-010',
      status: 'active',
      companyId,
    },
    {
      id: 'client-hospital-vita',
      name: 'Hospital Vita Prime',
      cnpj: '23.456.789/0001-01',
      email: 'logistica@vitaprime.com.br',
      phone: '11 3500-2200',
      address: 'Rua Dona Veridiana, 360',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01238-010',
      status: 'active',
      companyId,
    },
    {
      id: 'client-porto-andrade',
      name: 'Porto Andrade',
      cnpj: '34.567.890/0001-12',
      email: 'contato@portoandrade.com.br',
      phone: '13 3269-4455',
      address: 'Av. Portuária, 500',
      city: 'Santos',
      state: 'SP',
      zipCode: '11015-020',
      status: 'active',
      companyId,
    },
    {
      id: 'client-centro-frio',
      name: 'Centro Frio Alimentos',
      cnpj: '45.678.901/0001-23',
      email: 'suprimentos@centrofrio.com',
      phone: '11 2800-8080',
      address: 'Rod. Anchieta, Km 20',
      city: 'São Bernardo do Campo',
      state: 'SP',
      zipCode: '09895-000',
      status: 'active',
      companyId,
    },
    {
      id: 'client-tecnologia-alfa',
      name: 'Tecnologia Alfa',
      cnpj: '56.789.012/0001-34',
      email: 'recebimento@alfa.com',
      phone: '11 3777-4411',
      address: 'Rua Funchal, 200',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04551-060',
      status: 'active',
      companyId,
    },
    {
      id: 'client-cooperlog',
      name: 'Cooperlog Alimentos',
      cnpj: '67.890.123/0001-45',
      email: 'coordenacao@cooperlog.com',
      phone: '19 3300-7788',
      address: 'Av. Dr. Moraes Salles, 1700',
      city: 'Campinas',
      state: 'SP',
      zipCode: '13010-002',
      status: 'active',
      companyId,
    },
    {
      id: 'client-atacarejo-porto',
      name: 'Atacarejo Porto Real',
      cnpj: '78.901.234/0001-56',
      email: 'compras@porto-real.com',
      phone: '21 3988-7766',
      address: 'Av. Brasil, 11000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '21040-360',
      status: 'active',
      companyId,
    },
    {
      id: 'client-cafe-boreal',
      name: 'Café Boreal',
      cnpj: '89.012.345/0001-67',
      email: 'compras@cafeboreal.com',
      phone: '31 4004-4411',
      address: 'Rua Gonçalves Dias, 300',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30140-090',
      status: 'active',
      companyId,
    },
  ];

  const clients = await Promise.all(
    clientsData.map((client) => {
      const { id, ...data } = client;
      return prisma.client.upsert({
        where: { id },
        update: data,
        create: client,
      });
    }),
  );

  const clientsCompanyB = [
    {
      id: 'client-super-norte',
      name: 'Super Norte Atacado',
      cnpj: '98.765.432/0001-00',
      email: 'compras@supernorte.com',
      phone: '92 3300-4455',
      address: 'Av. Djalma Batista, 3000',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69050-010',
      status: 'active',
      companyId: companyBId,
    },
    {
      id: 'client-hospital-amazonas',
      name: 'Hospital Amazonas',
      cnpj: '12.987.654/0001-11',
      email: 'logistica@h-amazonas.com',
      phone: '92 3200-1234',
      address: 'Rua Paraíba, 120',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69057-021',
      status: 'active',
      companyId: companyBId,
    },
  ];

  await Promise.all(
    clientsCompanyB.map((client) =>
      prisma.client.upsert({
        where: { id: client.id },
        update: client,
        create: client,
      }),
    ),
  );

  const ordersData = [
    {
      id: 'order-rot-0001',
      orderNumber: 'ROT-0001',
      description: 'Distribuição linha branca Zona Sul',
      status: 'in_transit',
      priority: 'high',
      clientId: 'client-mercado-horizonte',
      companyId,
    },
    {
      id: 'order-rot-0002',
      orderNumber: 'ROT-0002',
      description: 'Medicamentos refrigerados para o Hospital Vita Prime',
      status: 'pending',
      priority: 'urgent',
      clientId: 'client-hospital-vita',
      companyId,
    },
    {
      id: 'order-rot-0003',
      orderNumber: 'ROT-0003',
      description: 'Carga de containers para o Porto Andrade',
      status: 'completed',
      priority: 'normal',
      clientId: 'client-porto-andrade',
      companyId,
    },
    {
      id: 'order-rot-0004',
      orderNumber: 'ROT-0004',
      description: 'Distribuição refrigerada para Centro Frio Alimentos',
      status: 'in_transit',
      priority: 'urgent',
      clientId: 'client-centro-frio',
      companyId,
    },
    {
      id: 'order-rot-0005',
      orderNumber: 'ROT-0005',
      description: 'Equipamentos eletrônicos Tecnologia Alfa',
      status: 'pending',
      priority: 'normal',
      clientId: 'client-tecnologia-alfa',
      companyId,
    },
    {
      id: 'order-rot-0006',
      orderNumber: 'ROT-0006',
      description: 'Cesta seca Cooperlog',
      status: 'completed',
      priority: 'normal',
      clientId: 'client-cooperlog',
      companyId,
    },
    {
      id: 'order-rot-0007',
      orderNumber: 'ROT-0007',
      description: 'Reabastecimento Atacarejo Porto Real',
      status: 'pending',
      priority: 'high',
      clientId: 'client-atacarejo-porto',
      companyId,
    },
    {
      id: 'order-rot-0008',
      orderNumber: 'ROT-0008',
      description: 'Café Boreal linha premium',
      status: 'in_transit',
      priority: 'normal',
      clientId: 'client-cafe-boreal',
      companyId,
    },
  ];

  const orders = await Promise.all(
    ordersData.map((order) => {
      const { id, ...data } = order;
      return prisma.order.upsert({
        where: { id },
        update: data,
        create: order,
      });
    }),
  );

  const ordersCompanyB = [
    {
      id: 'order-lnb-0001',
      orderNumber: 'LNB-0001',
      description: 'Produtos secos para Super Norte',
      status: 'pending',
      priority: 'high',
      clientId: 'client-super-norte',
      companyId: companyBId,
    },
    {
      id: 'order-lnb-0002',
      orderNumber: 'LNB-0002',
      description: 'Insumos hospitalares Hospital Amazonas',
      status: 'in_transit',
      priority: 'urgent',
      clientId: 'client-hospital-amazonas',
      companyId: companyBId,
    },
  ];

  await Promise.all(
    ordersCompanyB.map((order) =>
      prisma.order.upsert({
        where: { id: order.id },
        update: order,
        create: order,
      }),
    ),
  );

  const deliveriesData = [
    {
      id: 'delivery-rot-0001',
      orderId: 'order-rot-0001',
      status: 'in_transit',
      address: 'Rua Castro Alves, 120',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04109-001',
      latitude: -23.599,
      longitude: -46.638,
      scheduledAt: new Date('2024-06-18T08:00:00-03:00'),
      vehicleId: 'vehicle-sprinter-01',
      driverId: 'driver-joao-silva',
      routeId: 'route-sp-zona-sul',
    },
    {
      id: 'delivery-rot-0002',
      orderId: 'order-rot-0001',
      status: 'pending',
      address: 'Av. Washington Luís, 3120',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04662-002',
      latitude: -23.655,
      longitude: -46.699,
      scheduledAt: new Date('2024-06-18T10:30:00-03:00'),
      vehicleId: 'vehicle-sprinter-01',
      driverId: 'driver-joao-silva',
      routeId: 'route-sp-zona-sul',
    },
    {
      id: 'delivery-rot-0003',
      orderId: 'order-rot-0002',
      status: 'pending',
      address: 'Rua Dr. Enéas Carvalho de Aguiar, 255',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05403-000',
      latitude: -23.556,
      longitude: -46.668,
      scheduledAt: new Date('2024-06-18T09:00:00-03:00'),
      vehicleId: 'vehicle-daily-01',
      driverId: 'driver-maria-pereira',
      routeId: 'route-sp-abc',
    },
    {
      id: 'delivery-rot-0004',
      orderId: 'order-rot-0003',
      status: 'completed',
      address: 'Rua Barão de Tefé, 999',
      city: 'Santos',
      state: 'SP',
      zipCode: '11015-500',
      latitude: -23.951,
      longitude: -46.305,
      scheduledAt: new Date('2024-06-15T06:00:00-03:00'),
      completedAt: new Date('2024-06-15T14:10:00-03:00'),
      vehicleId: 'vehicle-actros-01',
      driverId: 'driver-ricardo-lima',
      routeId: 'route-sp-abc',
    },
    {
      id: 'delivery-rot-0005',
      orderId: 'order-rot-0004',
      status: 'in_transit',
      address: 'Rod. dos Imigrantes, Km 30',
      city: 'São Bernardo do Campo',
      state: 'SP',
      zipCode: '09895-200',
      latitude: -23.765,
      longitude: -46.605,
      scheduledAt: new Date('2024-06-18T07:00:00-03:00'),
      vehicleId: 'vehicle-constellation-01',
      driverId: 'driver-carlos-oliveira',
      routeId: 'route-sp-abc',
    },
    {
      id: 'delivery-rot-0006',
      orderId: 'order-rot-0005',
      status: 'pending',
      address: 'Rua Fradique Coutinho, 120',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05416-000',
      latitude: -23.561,
      longitude: -46.686,
      scheduledAt: new Date('2024-06-17T15:30:00-03:00'),
      vehicleId: 'vehicle-daily-01',
      driverId: 'driver-ana-souza',
      routeId: 'route-sp-zona-sul',
    },
    {
      id: 'delivery-rot-0007',
      orderId: 'order-rot-0006',
      status: 'completed',
      address: 'Av. Prestes Maia, 800',
      city: 'Campinas',
      state: 'SP',
      zipCode: '13070-134',
      latitude: -22.891,
      longitude: -47.068,
      scheduledAt: new Date('2024-06-14T05:00:00-03:00'),
      completedAt: new Date('2024-06-14T12:45:00-03:00'),
      vehicleId: 'vehicle-delivery-01',
      driverId: 'driver-lucas-santana',
      routeId: 'route-campinas-interior',
    },
    {
      id: 'delivery-rot-0008',
      orderId: 'order-rot-0007',
      status: 'pending',
      address: 'Av. Brasil, 11000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '21040-360',
      latitude: -22.832,
      longitude: -43.27,
      scheduledAt: new Date('2024-06-19T11:00:00-03:00'),
      vehicleId: 'vehicle-actros-01',
      driverId: 'driver-ricardo-lima',
      routeId: 'route-rj-metropolitana',
    },
    {
      id: 'delivery-rot-0009',
      orderId: 'order-rot-0008',
      status: 'in_transit',
      address: 'Rua Gonçalves Dias, 300',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30140-090',
      latitude: -19.932,
      longitude: -43.938,
      scheduledAt: new Date('2024-06-20T08:45:00-03:00'),
      vehicleId: 'vehicle-delivery-01',
      driverId: 'driver-ana-souza',
      routeId: 'route-campinas-interior',
    },
    {
      id: 'delivery-rot-0010',
      orderId: 'order-rot-0005',
      status: 'pending',
      address: 'Rua Gomes de Carvalho, 1609',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04547-006',
      latitude: -23.597,
      longitude: -46.689,
      scheduledAt: new Date('2024-06-18T16:00:00-03:00'),
      vehicleId: null,
      driverId: null,
      routeId: 'route-sp-zona-sul',
    },
  ];

  const deliveries = await Promise.all(
    deliveriesData.map((delivery) => {
      const { id, ...data } = delivery;
      return prisma.delivery.upsert({
        where: { id },
        update: data,
        create: delivery,
      });
    }),
  );

  const deliveriesCompanyB = [
    {
      id: 'delivery-lnb-0001',
      orderId: 'order-lnb-0001',
      status: 'pending',
      address: 'Av. Djalma Batista, 3000',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69050-010',
      latitude: -3.097,
      longitude: -60.023,
      scheduledAt: new Date('2024-06-19T08:00:00-04:00'),
      vehicleId: 'vehicle-b-constellation',
      driverId: 'driver-helena-borges',
      routeId: 'route-manaus-centro',
    },
    {
      id: 'delivery-lnb-0002',
      orderId: 'order-lnb-0002',
      status: 'in_transit',
      address: 'Rua Paraíba, 120',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69057-021',
      latitude: -3.100,
      longitude: -60.010,
      scheduledAt: new Date('2024-06-18T10:00:00-04:00'),
      vehicleId: 'vehicle-b-vuc',
      driverId: 'driver-marcus-lima',
      routeId: 'route-manaus-porto',
    },
  ];

  await Promise.all(
    deliveriesCompanyB.map((delivery) =>
      prisma.delivery.upsert({
        where: { id: delivery.id },
        update: delivery,
        create: delivery,
      }),
    ),
  );

  const pickupsData = [
    {
      id: 'pickup-rot-0001',
      orderId: 'order-rot-0005',
      status: 'scheduled',
      address: 'Rua do Rocio, 155',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04552-000',
      latitude: -23.593,
      longitude: -46.684,
      scheduledAt: new Date('2024-06-17T08:00:00-03:00'),
    },
    {
      id: 'pickup-rot-0002',
      orderId: 'order-rot-0003',
      status: 'completed',
      address: 'Av. Portuária, 500',
      city: 'Santos',
      state: 'SP',
      zipCode: '11015-020',
      latitude: -23.951,
      longitude: -46.303,
      scheduledAt: new Date('2024-06-14T05:00:00-03:00'),
      completedAt: new Date('2024-06-14T07:30:00-03:00'),
    },
    {
      id: 'pickup-rot-0003',
      orderId: 'order-rot-0006',
      status: 'completed',
      address: 'Av. Dr. Moraes Salles, 1700',
      city: 'Campinas',
      state: 'SP',
      zipCode: '13010-002',
      latitude: -22.904,
      longitude: -47.062,
      scheduledAt: new Date('2024-06-13T08:30:00-03:00'),
      completedAt: new Date('2024-06-13T09:15:00-03:00'),
    },
    {
      id: 'pickup-rot-0004',
      orderId: 'order-rot-0001',
      status: 'scheduled',
      address: 'Av. Eng. Luís Carlos Berrini, 901',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04571-010',
      latitude: -23.61,
      longitude: -46.696,
      scheduledAt: new Date('2024-06-17T06:00:00-03:00'),
    },
    {
      id: 'pickup-rot-0005',
      orderId: 'order-rot-0008',
      status: 'pending',
      address: 'Rua Gonçalves Dias, 300',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30140-090',
      latitude: -19.932,
      longitude: -43.938,
      scheduledAt: new Date('2024-06-19T07:15:00-03:00'),
    },
  ];

  await Promise.all(
    pickupsData.map((pickup) => {
      const { id, ...data } = pickup;
      return prisma.pickup.upsert({
        where: { id },
        update: data,
        create: pickup,
      });
    }),
  );

  const pickupsCompanyB = [
    {
      id: 'pickup-lnb-0001',
      orderId: 'order-lnb-0002',
      status: 'scheduled',
      address: 'Av. Buriti, 500',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69075-000',
      latitude: -3.146,
      longitude: -60.032,
      scheduledAt: new Date('2024-06-18T06:00:00-04:00'),
    },
  ];

  await Promise.all(
    pickupsCompanyB.map((pickup) =>
      prisma.pickup.upsert({
        where: { id: pickup.id },
        update: pickup,
        create: pickup,
      }),
    ),
  );

  const maintenancesData = [
    {
      id: 'maintenance-0001',
      type: 'Preventiva',
      description: 'Revisão completa e troca de filtros',
      cost: 3200,
      status: 'completed',
      scheduledAt: new Date('2024-05-10T09:00:00-03:00'),
      completedAt: new Date('2024-05-11T17:00:00-03:00'),
      vehicleId: 'vehicle-sprinter-01',
    },
    {
      id: 'maintenance-0002',
      type: 'Corretiva',
      description: 'Substituição de pastilhas e discos de freio',
      cost: 1800,
      status: 'pending',
      scheduledAt: new Date('2024-06-20T13:30:00-03:00'),
      vehicleId: 'vehicle-constellation-01',
    },
    {
      id: 'maintenance-0003',
      type: 'Pneus',
      description: 'Troca de dois pneus eixo dianteiro',
      cost: 2400,
      status: 'completed',
      scheduledAt: new Date('2024-05-30T08:00:00-03:00'),
      completedAt: new Date('2024-05-30T18:00:00-03:00'),
      vehicleId: 'vehicle-delivery-01',
    },
  ];

  await Promise.all(
    maintenancesData.map((maintenance) => {
      const { id, ...data } = maintenance;
      return prisma.maintenance.upsert({
        where: { id },
        update: data,
        create: maintenance,
      });
    }),
  );

  const fuelLogsData = [
    {
      id: 'fuel-0001',
      liters: 78,
      cost: 520.4,
      fuelType: 'Diesel S10',
      station: 'Posto Marginal Pinheiros',
      odometer: 125670,
      vehicleId: 'vehicle-constellation-01',
    },
    {
      id: 'fuel-0002',
      liters: 52,
      cost: 365.9,
      fuelType: 'Diesel S10',
      station: 'Rede Graal Dutra',
      odometer: 88760,
      vehicleId: 'vehicle-sprinter-01',
    },
    {
      id: 'fuel-0003',
      liters: 65,
      cost: 452.7,
      fuelType: 'Diesel S10',
      station: 'Auto Posto Anchieta',
      odometer: 64320,
      vehicleId: 'vehicle-daily-01',
    },
    {
      id: 'fuel-0004',
      liters: 110,
      cost: 780.5,
      fuelType: 'Diesel S10',
      station: 'Posto Presidente Dutra',
      odometer: 210450,
      vehicleId: 'vehicle-actros-01',
    },
  ];

  await Promise.all(
    fuelLogsData.map((fuel) => {
      const { id, ...data } = fuel;
      return prisma.fuel.upsert({
        where: { id },
        update: data,
        create: fuel,
      });
    }),
  );

  const expensesData = [
    {
      id: 'expense-0001',
      description: 'Pedágios corredor Anhanguera',
      amount: 842.9,
      category: 'Pedágio',
      date: new Date('2024-06-14T00:00:00-03:00'),
      companyId,
    },
    {
      id: 'expense-0002',
      description: 'Seguro frota mensal',
      amount: 5140.55,
      category: 'Seguro',
      date: new Date('2024-06-01T00:00:00-03:00'),
      companyId,
    },
    {
      id: 'expense-0003',
      description: 'Diárias motoristas RJ',
      amount: 1890.0,
      category: 'Diárias',
      date: new Date('2024-06-17T00:00:00-03:00'),
      companyId,
    },
    {
      id: 'expense-0004',
      description: 'Licenciamento frota leve',
      amount: 2675.35,
      category: 'Documentação',
      date: new Date('2024-05-27T00:00:00-03:00'),
      companyId,
    },
  ];

  await Promise.all(
    expensesData.map((expense) => {
      const { id, ...data } = expense;
      return prisma.expense.upsert({
        where: { id },
        update: data,
        create: expense,
      });
    }),
  );


  const notificationsData = [
    {
      id: 'notification-0001',
      title: 'Entrega crítica atrasada',
      message: 'Ordem ROT-0002 está atrasada em 2 horas.',
      type: 'alert',
      companyId,
      userId: managerUser.id,
    },
    {
      id: 'notification-0002',
      title: 'Manutenção pendente',
      message: 'Sprinter 416 CDI aguarda liberação da troca de pastilhas.',
      type: 'maintenance',
      companyId,
      userId: operatorUser.id,
    },
    {
      id: 'notification-0003',
      title: 'Novo cliente ativo',
      message: 'Café Boreal integrado à carteira.',
      type: 'info',
      companyId,
      userId: adminUser.id,
    },
    {
      id: 'notification-0004',
      title: 'Operação crítica em trânsito',
      message: 'OP-LNB-TRN está em andamento com prioridade crítica.',
      type: 'alert',
      companyId: companyBId,
      userId: companyBManager.id,
    },
    {
      id: 'notification-0005',
      title: 'Manutenção preventiva agendada',
      message: 'VUC LogNorte passará por manutenção amanhã.',
      type: 'maintenance',
      companyId: companyBId,
      userId: companyBManager.id,
    },
  ];

  await Promise.all(
    notificationsData.map((notification) => {
      const { id, ...data } = notification;
      return prisma.notification.upsert({
        where: { id },
        update: data,
        create: notification,
      });
    }),
  );

  console.log('Seed complementar concluída:');
  console.log(
    `Rotas: ${routes.length}, Veículos: ${vehicles.length}, Motoristas: ${drivers.length}, Clientes: ${clients.length}, Pedidos: ${orders.length}, Entregas: ${deliveries.length}`,
  );
}

seed()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
