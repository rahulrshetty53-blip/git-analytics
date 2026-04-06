@echo off
title Git Analytics - Complete Setup & Run
color 0A
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║        Git Analytics - COMPLETE SETUP & START                ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if MongoDB is installed
echo [CHECK 1/4] Verifying MongoDB installation...
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ MongoDB not found in system PATH
    echo.
    echo Please install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo After installation, restart your computer and try again.
    pause
    exit /b 1
)
echo ✅ MongoDB found!

REM Check Node.js
echo.
echo [CHECK 2/4] Verifying Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found
    echo Install from: https://nodejs.org
    pause
    exit /b 1
)
node --version
echo ✅ Node.js found!

REM Check backend dependencies
echo.
echo [CHECK 3/4] Checking Backend dependencies...
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)
echo ✅ Backend ready!

REM Check frontend dependencies
echo.
echo [CHECK 4/4] Checking Frontend dependencies...
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)
echo ✅ Frontend ready!

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║              STARTING ALL SERVICES NOW...                      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Create data directory
mkdir "data" >nul 2>&1

REM Start MongoDB
echo [1/3] Starting MongoDB on port 27017...
start "MongoDB" cmd /c "mongod --dbpath !CD!\data"
timeout /t 3 /nobreak

REM Start Backend
echo.
echo [2/3] Starting Backend on port 5000...
start "Backend - Git Analytics" cmd /c "cd !CD!\backend && npm run dev"
timeout /t 3 /nobreak

REM Start Frontend
echo.
echo [3/3] Starting Frontend on port 5173...
start "Frontend - Git Analytics" cmd /c "cd !CD!\frontend && npm run dev"
timeout /t 3 /nobreak

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                  ✅ ALL SERVICES STARTED!                      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📋 Three new windows have opened:
echo    1. MongoDB (Database - port 27017)
echo    2. Backend (API Server - port 5000)
echo    3. Frontend (Web App - port 5173)
echo.
echo ⚠️  IMPORTANT: Keep all three windows OPEN while using the app!
echo.
echo ⏳ Wait 10 seconds for everything to initialize...
timeout /t 10 /nobreak

echo.
echo 🌐 Opening http://localhost:5173 in your browser...
start http://localhost:5173

echo.
echo ✅ Setup complete! Browser should open automatically.
echo.
echo 📌 Next steps:
echo    1. Log in (or create account if first time)
echo    2. Go to Settings
echo    3. Add your GitHub Personal Access Token
echo    4. Go to Dashboard
echo    5. Click "Sync Repositories"
echo    6. Wait for your GitHub data to load!
echo.
echo Press any key to close this window...
pause
