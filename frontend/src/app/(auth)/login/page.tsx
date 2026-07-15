'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Truck, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.auth.login(email, password);
      authService.setToken(response.access_token);
      authService.setUser(response.user);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-800 rounded-2xl mb-4 animate-fade-in">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">Rotvex</h1>
          <p className="text-primary-300 animate-fade-in">Gestão logística inteligente</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Acessar sistema</h2>
            <p className="text-primary-300 text-sm">Entre suas credenciais para continuar</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-fade-in">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10"
            />
            
            <Input
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-primary-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-600 focus:ring-primary-500"
                />
                Lembrar-me
              </label>
              <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-primary-300">
              Não tem uma conta?{' '}
              <a href="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Criar conta
              </a>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-primary-400">
          © 2026 Rotvex. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
