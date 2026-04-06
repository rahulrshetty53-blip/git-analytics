@echo off
title MongoDB Service - Git Analytics
color 0A

echo.
echo ╔════════════════════════════════════════════╗
echo ║   Starting MongoDB for Git Analytics      ║
echo ╚════════════════════════════════════════════╝
echo.

mkdir "c:\Users\DELL\Downloads\Analytics\data" >nul 2>&1

echo Starting MongoDB...
echo.

mongod --dbpath "c:\Users\DELL\Downloads\Analytics\data"

pause
