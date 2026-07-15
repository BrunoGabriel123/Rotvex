'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Truck, Lock, Mail, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 items-center justify-center p-12 relative overflow-hidden animate-slide-in-left">
        {/* Abstract patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              <Truck className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight animate-fade-in">
            Rotvex
          </h1>
          <p className="text-xl text-primary-200 leading-relaxed animate-fade-in">
            Gestão logística inteligente para transformar sua operação
          </p>
          <div className="mt-12 flex justify-center gap-8 text-primary-300 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">+500</div>
              <div className="text-sm mt-1">Empresas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">+10k</div>
              <div className="text-sm mt-1">Entregas/dia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="bg-primary-800 p-3 rounded-xl">
              <Truck className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bem-vindo de volta
              </h2>
              <p className="text-gray-600">
                Entre com suas credenciais para acessar o painel
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-fade-in">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                label="Email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail className="w-5 h-5 text-gray-400" />}
              />
              
              <Input
                type="password"
                label="Senha"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<Lock className="w-5 h-5 text-gray-400" />}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full py-3 text-base"
              >
                {loading ? 'Entrando...' : (
                  <span className="flex items-center justify-center gap-2">
                    Entrar
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <a href="/register" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Criar conta
                </a>
              </p>
            </div>
          </div>

          <p className="text-center mt-6 text-xs text-gray-500">
            © 2026 Rotvex. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
