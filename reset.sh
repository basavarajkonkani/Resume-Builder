#!/bin/bash

# This script helps reset the development environment when issues occur

echo "Cleaning up the development environment..."

# Stop any running Node processes
echo "Stopping running processes..."
pkill -f node || true

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Remove node_modules and package-lock.json
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Start the development server
echo "Starting development server..."
npm run dev

echo "Reset complete!"