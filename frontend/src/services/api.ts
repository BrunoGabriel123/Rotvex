// Mock API client
// Replace with actual API implementation when integrating with backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    // Mock implementation - replace with actual fetch
    console.log(`GET ${API_URL}${endpoint}`);
    return {} as T;
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    // Mock implementation - replace with actual fetch
    console.log(`POST ${API_URL}${endpoint}`, data);
    return {} as T;
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    // Mock implementation - replace with actual fetch
    console.log(`PUT ${API_URL}${endpoint}`, data);
    return {} as T;
  }

  async delete<T>(endpoint: string): Promise<T> {
    // Mock implementation - replace with actual fetch
    console.log(`DELETE ${API_URL}${endpoint}`);
    return {} as T;
  }
}

export const api = new ApiClient();
