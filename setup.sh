#!/bin/bash

# Linai Henna Business - Quick Setup Script

echo "🎨 Setting up Linai Henna Business Website..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo "✓ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🚀 To start the development server, run:"
    echo "   npm run dev"
    echo ""
    echo "📱 The website will open at: http://localhost:3000"
    echo ""
    echo "🔐 Admin Login:"
    echo "   Email: admin@linaihenna.com"
    echo "   Password: admin123"
    echo ""
    echo "📖 For more information, see README.md"
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
