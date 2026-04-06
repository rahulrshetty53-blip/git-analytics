@echo off
title Git Analytics - Manual Cleanup & Start
color 0C
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         CLEANUP: Force Kill All Node/MongoDB Processes        ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [1/4] Terminating all Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
echo     ✅ Done

echo.
echo [2/4] Terminating all MongoDB processes...
taskkill /F /IM mongod.exe >nul 2>&1
echo     ✅ Done

echo.
echo [3/4] Waiting for ports to be freed...
timeout /t 3 /nobreak

echo.
echo [4/4] Checking ports are free...
netstat -ano | findstr ":5000\|:5173\|:27017" >nul
if %ERRORLEVEL% EQU 0 (
    echo     ⚠️  Ports still in use, waiting more...
    timeout /t 3 /nobreak
) else (
    echo     ✅ Ports are free!
)

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║               STARTING ALL SERVICES (FRESH)                   ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Start MongoDB
echo [1/3] Starting MongoDB on port 27017...
mkdir "!CD!\data" >nul 2>&1
start "MongoDB" cmd /k "cd !CD! && mongod --dbpath data"
timeout /t 3 /nobreak
echo      ✅ MongoDB started

echo.
echo [2/3] Starting Backend on port 5000...
start "Backend" cmd /k "cd !CD!\backend && npm run dev"
timeout /t 5 /nobreak
echo      ✅ Backend started

echo.
echo [3/3] Starting Frontend on port 5173...
start "Frontend" cmd /k "cd !CD!\frontend && npm run dev"
timeout /t 4 /nobreak
echo      ✅ Frontend started

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    ✅ ALL SERVICES STARTED                     ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo 🌐 Services:
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:5000
echo    MongoDB:   localhost:27017
echo.

echo ⏳ Waiting 5 seconds before opening browser...
timeout /t 5 /nobreak

echo.
echo 🌍 Opening application in browser...
start http://localhost:5173

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                     ✅ SETUP COMPLETE!                        ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo 📌 NEXT STEPS IN THE APP:
echo    1. Go to Settings → Add your GitHub token
echo    2. Create GitHub repo: https://github.com/new
echo    3. Run: PUSH_TO_GITHUB.bat
echo    4. Back to Dashboard → Click "Sync Repositories"
echo    5. See your analytics!
echo.

echo ⚠️  IMPORTANT: Keep all 3 windows open (MongoDB, Backend, Frontend)
echo.

echo Press any key to close this window (services keep running)
pause
