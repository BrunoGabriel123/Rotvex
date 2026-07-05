#!/bin/bash

set -e

echo "🚀 Iniciando setup do Rotvex..."

# Check if .env exists, if not copy from .env.example
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env a partir de .env.example..."
    cp .env.example .env
    echo "⚠️  Por favor, edite o arquivo .env com suas configurações reais"
else
    echo "✅ Arquivo .env já existe"
fi

# Install root dependencies
echo "📦 Instalando dependências raiz..."
npm install

# Install frontend dependencies
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Instalando dependências do backend..."
cd backend
npm install
cd ..

# Create necessary directories
echo "📁 Criando diretórios necessários..."
mkdir -p logs uploads temp cache

# Setup Husky
echo "🪝 Configurando Husky..."
npx husky install

echo "✅ Setup concluído com sucesso!"
echo ""
echo "Próximos passos:"
echo "1. Edite o arquivo .env com suas configurações"
echo "2. Execute 'npm run dev' para iniciar o ambiente de desenvolvimento"
echo "3. Ou execute 'npm run docker:up' para iniciar com Docker"
