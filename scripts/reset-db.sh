#!/bin/bash

set -e

echo "⚠️  AVISO: Isso irá resetar o banco de dados PostgreSQL"
read -p "Tem certeza? (y/N) " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operação cancelada"
    exit 1
fi

echo "🗑️  Resetando banco de dados..."

# Stop containers
docker-compose down

# Remove volume
docker volume rm rotvex_postgres-data 2>/dev/null || true

# Start containers
docker-compose up -d postgres redis

echo "⏳ Aguardando PostgreSQL iniciar..."
sleep 10

echo "✅ Banco de dados resetado com sucesso!"
