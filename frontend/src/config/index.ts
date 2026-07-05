// Global configuration for Rotvex frontend

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    timeout: 30000,
  },
  app: {
    name: "Rotvex",
    version: "1.0.0",
  },
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
};
