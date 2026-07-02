#!/bin/bash

set -e

echo "🌱 Iniciando seed do banco de dados..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando"
    exit 1
fi

# Run seed command
cd backend
npm run seed
cd ..

echo "✅ Seed concluído com sucesso!"
