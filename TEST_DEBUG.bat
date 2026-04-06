@echo off
title Analytics Debug Test
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║          Git Analytics - API Debug Test                       ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [1] Testing Backend Health...
curl -s http://localhost:5000/health
echo.
echo.

echo [2] Checking MongoDB Commits...
echo Run this in MongoDB shell:
echo   db.commits.find().count()
echo.

echo [3] Browser Console Check...
echo Open: http://localhost:5173
echo Press F12 and go to Console tab
echo Look for error messages
echo.

echo [4] Check Network Tab...
echo Press F12 → Network tab
echo Click Analytics
echo Select git-analytics repo
echo Look for failed requests (red)
echo.

pause
