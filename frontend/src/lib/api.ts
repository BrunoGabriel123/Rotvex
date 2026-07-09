const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }

  const json = await response.json();
  return json.data || json;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchAPI<{ access_token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (data: { email: string; password: string; name: string }) =>
      fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    logout: () =>
      fetchAPI('/auth/logout', {
        method: 'POST',
      }),
    refresh: () =>
      fetchAPI<{ access_token: string }>('/auth/refresh', {
        method: 'POST',
      }),
  },
  dashboard: {
    getMetrics: (companyId: string) =>
      fetchAPI(`/dashboard/metrics?companyId=${companyId}`),
  },
};
