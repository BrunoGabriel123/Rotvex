// Mock data for development
// Replace with actual API calls when integrating with backend

import { User, Vehicle, Driver, Client, Delivery, Pickup, Order } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@rotvex.com",
    role: "admin",
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plate: "ABC-1234",
    model: "Volkswagen Delivery",
    year: 2023,
    status: "in_progress",
  },
  {
    id: "2",
    plate: "DEF-5678",
    model: "Fiat Fiorino",
    year: 2022,
    status: "completed",
  },
];

export const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "(11) 98765-4321",
    license: "123456789",
    status: "in_progress",
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "(11) 91234-5678",
    license: "987654321",
    status: "pending",
  },
];

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Empresa ABC",
    email: "contato@abc.com",
    phone: "(11) 3456-7890",
    address: "Rua A, 123 - São Paulo, SP",
  },
  {
    id: "2",
    name: "Comércio XYZ",
    email: "vendas@xyz.com",
    phone: "(11) 2345-6789",
    address: "Av. B, 456 - São Paulo, SP",
  },
];

export const mockDeliveries: Delivery[] = [
  {
    id: "1",
    orderId: "ORD-001",
    status: "in_progress",
    address: "Rua C, 789 - São Paulo, SP",
    scheduledDate: "2024-01-15T10:00:00Z",
  },
];

export const mockPickups: Pickup[] = [
  {
    id: "1",
    orderId: "ORD-001",
    status: "completed",
    address: "Rua D, 321 - São Paulo, SP",
    scheduledDate: "2024-01-15T08:00:00Z",
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    clientId: "1",
    status: "in_progress",
    createdAt: "2024-01-15T07:00:00Z",
    items: [
      {
        id: "1",
        name: "Produto A",
        quantity: 10,
      },
    ],
  },
];
