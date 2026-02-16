@echo off
set PATH=%PATH%;C:\Program Files\nodejs
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo "NPM Install Failed!"
    pause
    exit /b %errorlevel%
)
echo Starting server...
echo Tying to run without Turbopack explicit flag...
call npm run dev -- --turbo=false
pause
