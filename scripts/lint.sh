#!/bin/bash

set -e

echo "🔍 Iniciando lint do projeto..."

echo "📦 Lint do frontend..."
npm run lint:frontend

echo "📦 Lint do backend..."
npm run lint:backend

echo "✅ Lint concluído com sucesso!"
