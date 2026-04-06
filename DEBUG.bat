@echo off
title Git Analytics - Debug & Troubleshoot
color 0E

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║          Git Analytics - DEBUGGING SYNC ISSUES                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [STEP 1] Testing Backend Connection...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
curl -s http://localhost:5000/health
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Backend is RUNNING
) else (
    echo.
    echo ❌ Backend is NOT RUNNING
    echo Please make sure backend server is started
    pause
    exit /b 1
)

echo.
echo [STEP 2] Testing MongoDB Connection...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd backend
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/git-analytics', {}).then(() => { console.log('✅ MongoDB is CONNECTED'); mongoose.connection.close(); process.exit(0); }).catch(e => { console.log('❌ MongoDB ERROR: ' + e.message); process.exit(1); })"

cd ..

echo.
echo [STEP 3] Checking if you have a GitHub token...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Go to: http://localhost:5173/settings
echo Make sure you have added your GitHub Personal Access Token
echo.
echo If you haven't:
echo 1. Visit: https://github.com/settings/tokens
echo 2. Create new token with 'repo' and 'user' scopes
echo 3. Add it in the Settings page
echo.

echo [STEP 4] Manual Sync Test...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📌 Instructions:
echo 1. Open browser and go to: http://localhost:5173/dashboard
echo 2. Open Developer Console: Press F12
echo 3. Go to Console tab
echo 4. Click the "Sync Repositories" button
echo 5. Look for any RED ERROR messages in the console
echo 6. Take a SCREENSHOT of any errors
echo.

pause
