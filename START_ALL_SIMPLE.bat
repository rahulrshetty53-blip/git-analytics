@echo off
title Git Analytics - Startup
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║          Git Analytics - Starting All Services                ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if MongoDB is installed
echo [STEP 1/3] Checking MongoDB...
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: MongoDB not found!
    echo.
    echo MongoDB must be installed first:
    echo 👉 https://www.mongodb.com/try/download/community
    echo.
    echo After installation, restart your computer and try again.
    echo.
    pause
    exit /b 1
)
echo ✅ MongoDB found!

REM Check Node.js
echo.
echo [STEP 2/3] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: Node.js not found!
    echo.
    echo Install from: 👉 https://nodejs.org
    echo.
    pause
    exit /b 1
)
node --version
echo ✅ Node.js found!

REM Start services
echo.
echo [STEP 3/3] Starting services...
echo.

echo 🟢 Starting MongoDB Server...
echo    (This window will keep running MongoDB)
echo.
start "MongoDB Server" mongod

echo 🟢 Starting Backend Server...
echo    (This window will keep running the Backend)
echo.
cd /d "%~dp0backend" || (
    echo ❌ ERROR: Cannot find backend folder!
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies (first time only)...
    call npm install >nul 2>&1
)

start "Backend Server - Git Analytics" cmd /k "npm run dev"

echo 🟢 Starting Frontend Server...
echo    (This window will keep running the Frontend)
echo.
cd /d "%~dp0frontend" || (
    echo ❌ ERROR: Cannot find frontend folder!
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies (first time only)...
    call npm install >nul 2>&1
)

start "Frontend Server - Git Analytics" cmd /k "npm run dev"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                     ✅ ALL SERVICES STARTED!                   ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📋 Three new windows will open:
echo    1. MongoDB Server (data storage)
echo    2. Backend Server (API on port 5000)
echo    3. Frontend Server (UI on port 5173)
echo.
echo 💡 Important: Keep all these windows OPEN!
echo.
echo 🌐 Open your browser and go to:
echo    👉 http://localhost:5173
echo.
echo ⏳ Wait 10-15 seconds for all services to fully start...
echo.
timeout /t 5
echo.
start http://localhost:5173
echo Browser opening at http://localhost:5173...
echo.
echo Press any key to close this window (other windows will stay open)
pause
exit /b 0
