export const authService = {
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  setUser: (user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  isAuthenticated: () => {
    return !!authService.getToken();
  },

  logout: async () => {
    try {
      const { api } = await import('./api');
      await api.auth.logout();
    } catch (error) {
      console.error('Erro ao fazer logout no backend:', error);
    } finally {
      authService.removeToken();
      authService.removeUser();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  },
};
