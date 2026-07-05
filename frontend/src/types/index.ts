// Global types for Rotvex frontend

export type Status = "pending" | "in_progress" | "completed" | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  year: number;
  status: Status;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  status: Status;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Delivery {
  id: string;
  orderId: string;
  status: Status;
  address: string;
  scheduledDate: string;
}

export interface Pickup {
  id: string;
  orderId: string;
  status: Status;
  address: string;
  scheduledDate: string;
}

export interface Order {
  id: string;
  clientId: string;
  status: Status;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

export interface Route {
  id: string;
  name: string;
  stops: RouteStop[];
  status: Status;
}

export interface RouteStop {
  id: string;
  address: string;
  sequence: number;
  completed: boolean;
}
