@echo off
echo ============================================
echo Git Analytics - Starting All Services
echo ============================================

REM Check if mongod is installed
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo MongoDB not found in PATH
    echo Please ensure MongoDB is installed and added to PATH
    pause
    exit /b 1
)

echo.
echo [1/2] Starting MongoDB...
echo ============================================
start cmd /k "mongod"
timeout /t 3

echo.
echo [2/2] Starting Backend Server...
echo ============================================
cd backend
call npm install >nul 2>&1
start cmd /k "npm run dev"

echo.
echo ============================================
echo All services starting...
echo MongoDB:  http://localhost:27017
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo ============================================
echo.
echo Keep these windows open for the app to work!
pause
