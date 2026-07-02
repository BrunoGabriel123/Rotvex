#!/bin/bash

set -e

echo "🧹 Limpando artefatos de build e cache..."

# Clean frontend
echo "📦 Limpando frontend..."
cd frontend
rm -rf .next node_modules/.cache
cd ..

# Clean backend
echo "📦 Limpando backend..."
cd backend
rm -rf dist node_modules/.cache
cd ..

# Clean logs
echo "📁 Limpando logs..."
rm -rf logs/*

# Clean temp
echo "📁 Limpando temp..."
rm -rf temp/*

# Clean cache
echo "📁 Limpando cache..."
rm -rf cache/*

echo "✅ Limpeza concluída com sucesso!"
