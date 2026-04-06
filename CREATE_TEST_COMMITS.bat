@echo off
REM Create multiple commits for testing analytics
cd /d "c:\Users\DELL\Downloads\Analytics"

echo Creating test commits...
echo.

REM Commit 2
echo. >> IMPROVEMENTS.md
echo # Backend Improvements >> IMPROVEMENTS.md
git add IMPROVEMENTS.md
git commit -m "Optimize backend performance - Add caching and improve query efficiency"
git push origin main

REM Commit 3
echo # Frontend Enhancements >> IMPROVEMENTS.md
git add IMPROVEMENTS.md
git commit -m "Enhance UI components - Add animations and improve responsiveness"
git push origin main

REM Commit 4
echo # Bug Fixes >> IMPROVEMENTS.md
git add IMPROVEMENTS.md
git commit -m "Fix critical bugs - Handle timezone and PR count issues"
git push origin main

REM Commit 5
echo # Documentation >> IMPROVEMENTS.md
git add IMPROVEMENTS.md
git commit -m "Add API documentation - Include examples and error handling"
git push origin main

REM Commit 6
echo # Security >> IMPROVEMENTS.md
git add IMPROVEMENTS.md
git commit -m "Improve security measures - Add validation and rate limiting"
git push origin main

REM Commit 7
echo # Performance Tweaks >> IMPROVEMENTS.md
git add IMPROVEMENTS.md
git commit -m "Performance optimization - Lazy loading and bundle size reduction"
git push origin main

echo.
echo ✅ All commits created and pushed!
echo.
git log --oneline | head -10
echo.
echo Now go back to the dashboard and click "Sync Repositories"
pause
