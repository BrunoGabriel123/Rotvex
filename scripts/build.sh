#!/bin/bash

set -e

echo "🔨 Iniciando build do projeto..."

echo "📦 Build do frontend..."
npm run build:frontend

echo "📦 Build do backend..."
npm run build:backend

echo "✅ Build concluído com sucesso!"
