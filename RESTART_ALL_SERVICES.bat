@echo off
title Git Analytics - Restart Services
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║        Git Analytics - Restarting ALL Services                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [1/3] Killing all Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2

echo.
echo [2/3] Starting Backend Server...
cd /d "%~dp0backend"
start "🔧 Backend Server" cmd /k "npm run dev"
timeout /t 4

echo.
echo [3/3] Starting Frontend Server...
cd /d "%~dp0frontend"
start "🎨 Frontend Server" cmd /k "npm run dev"
timeout /t 3

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    ✅ ALL SERVICES STARTED!                   ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🌐 Open Browser: http://localhost:5173
echo.
echo 📋 Keep these 3 windows open:
echo    1. Main console (this one)
echo    2. Backend Server (🔧)
echo    3. Frontend Server (🎨)
echo.
echo 🚀 Ready to use! Go test the sync feature.
echo.
pause
