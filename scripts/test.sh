#!/bin/bash

set -e

echo "🧪 Iniciando testes do projeto..."

echo "📦 Testes do frontend..."
npm run test:frontend

echo "📦 Testes do backend..."
npm run test:backend

echo "✅ Testes concluídos com sucesso!"
