#!/bin/bash

echo "🚀 Starting KInba E-Shop..."

# Check if MongoDB is running
if ! brew services list | grep -q "mongodb-community.*started"; then
    echo "⚠️  MongoDB is not running. Starting MongoDB..."
    brew services start mongodb-community
    sleep 3
fi

# Start backend
echo "📦 Starting backend server..."
cd Codes/backend
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo "🎨 Starting frontend server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "✅ KInba E-Shop is starting up!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
