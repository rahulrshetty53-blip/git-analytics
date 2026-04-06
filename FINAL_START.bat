@echo off
title Git Analytics - Clean Start
color 0A
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║          Git Analytics - CLEAN START (FINAL VERSION!)         ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Kill any existing processes
echo [CLEANUP] Killing any existing services...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM mongod.exe >nul 2>&1
timeout /t 2 /nobreak

echo ✅ Old processes stopped

echo.
echo ═══════════════════════════════════════════════════════════════════

REM Check MongoDB
echo.
echo [CHECK] Verifying MongoDB installation...
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ MongoDB not found. Please install it first.
    pause
    exit /b 1
)
echo ✅ MongoDB found

echo.
echo ═══════════════════════════════════════════════════════════════════

REM Start MongoDB
echo.
echo [1/3] Starting MongoDB...
mkdir "data" >nul 2>&1
start "MongoDB" mongod --dbpath "!CD!\data"
timeout /t 3 /nobreak
echo ✅ MongoDB started on port 27017

echo.
echo ═══════════════════════════════════════════════════════════════════

REM Start Backend
echo.
echo [2/3] Starting Backend Server...
cd /d "!CD!\backend"
start "Backend - Git Analytics" cmd /k "npm run dev"
timeout /t 4 /nobreak
echo ✅ Backend starting on port 5000

echo.
echo ═══════════════════════════════════════════════════════════════════

REM Start Frontend
echo.
echo [3/3] Starting Frontend Server...
cd /d "!CD!\frontend"
start "Frontend - Git Analytics" cmd /k "npm run dev"
timeout /t 3 /nobreak
echo ✅ Frontend starting on port 5173

echo.
echo ═══════════════════════════════════════════════════════════════════
echo.
echo ✅ ALL SERVICES STARTED!
echo.
echo 🌐 Frontend:  http://localhost:5173
echo 🔧 Backend:   http://localhost:5000
echo 💾 MongoDB:   mongodb://localhost:27017
echo.
echo ⏳ Wait 10 seconds for everything to initialize...
timeout /t 10 /nobreak

echo.
echo 🌍 Opening browser...
start http://localhost:5173

echo.
echo ✅ Setup complete!
echo.
echo 📌 NEXT STEPS:
echo    1. Create GitHub repo: https://github.com/new
echo    2. Run: PUSH_TO_GITHUB.bat
echo    3. Sync your repo in the app
echo    4. Watch analytics appear!
echo.
echo Press any key to close this window (3 services stay running)
pause
