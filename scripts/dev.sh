#!/bin/bash

set -e

echo "🚀 Iniciando ambiente de desenvolvimento..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado. Execute ./scripts/setup.sh primeiro"
    exit 1
fi

# Start frontend and backend
echo "📦 Iniciando frontend e backend..."
npm run dev
