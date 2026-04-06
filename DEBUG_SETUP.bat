@echo off
echo ============================================
echo Git Analytics - Debug & Setup
echo ============================================

echo.
echo [CHECK 1] MongoDB Installation
where mongod 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ MongoDB NOT FOUND in PATH
    echo Install from: https://www.mongodb.com/try/download/community
    echo Then restart your computer
) else (
    echo ✅ MongoDB found
)

echo.
echo [CHECK 2] Node.js and npm
where node >nul 2>&1 && where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js or npm NOT FOUND
    echo Install from: https://nodejs.org
) else (
    node --version
    npm --version
    echo ✅ Node.js and npm OK
)

echo.
echo [CHECK 3] Backend Dependencies
cd backend 2>nul
if exist "node_modules" (
    echo ✅ Dependencies installed
) else (
    echo ❌ Installing dependencies...
    call npm install
)

echo.
echo [CHECK 4] MongoDB Connection
cd ..
echo Checking if MongoDB is running...
timeout /t 2

REM Try to connect to MongoDB
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/git-analytics', {}).then(() => console.log('✅ MongoDB connected!')).catch(e => console.log('❌ MongoDB connection failed: ' + e.message))" 2>nul

echo.
echo ============================================
echo Setup Check Complete!
echo ============================================
pause
