@echo off
title Git Analytics - Push to GitHub
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║          Git Analytics - PUSH TO GITHUB REPOSITORY            ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo 📋 Before running this script:
echo.
echo 1. Go to: https://github.com/new
echo 2. Create new repository:
echo    - Name: git-analytics
echo    - Visibility: Public
echo    - Don't initialize (we have local git)
echo 3. Click Create
echo.
echo 4. Copy the HTTPS URL shown (looks like):
echo    https://github.com/YOUR_USERNAME/git-analytics.git
echo.

set /p GITHUB_URL="📌 Paste your GitHub repository URL here: "

if "%GITHUB_URL%"=="" (
    echo ❌ No URL provided. Exiting...
    pause
    exit /b 1
)

echo.
echo 🚀 Adding remote origin...
cd /d "%~dp0"
git remote add origin %GITHUB_URL%

echo.
echo 📤 Pushing code to GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Code pushed to GitHub!
    echo.
    echo 🌐 Your repository is now at: %GITHUB_URL%
    echo.
    echo Next steps:
    echo 1. Go back to the Git Analytics app
    echo 2. Open http://localhost:5173/settings
    echo 3. Add your GitHub Personal Access Token
    echo 4. Go to Dashboard
    echo 5. Click "Sync Repositories"
    echo 6. Select your "git-analytics" repo
    echo 7. Watch the analytics populate!
) else (
    echo.
    echo ❌ Push failed. Check your:
    echo    - GitHub URL is correct
    echo    - Internet connection
    echo    - GitHub authentication
)

echo.
pause
