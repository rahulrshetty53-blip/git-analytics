@echo off
title Git Analytics - Services
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║   Git Analytics - Starting Services (Windows)                ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo Step 1: Starting MongoDB...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
start "MongoDB" mongod
timeout /t 3

echo.
echo Step 2: Starting Backend Server...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd /d "%~dp0backend"
start "Backend Server" cmd /k "npm run dev"
timeout /t 3

echo.
echo Step 3: Starting Frontend Server...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "npm run dev"
timeout /t 3

echo.
echo ✅ All Services Started!
echo.
echo 🌐 Open browser: http://localhost:5173
echo.
echo 📋 Keep these windows open:
echo    - MongoDB window
echo    - Backend window
echo    - Frontend window
echo.
pause
