@echo off
set PATH=%PATH%;C:\Program Files\nodejs
echo Building project...
call npm run build
if %errorlevel% neq 0 (
    echo "Build Failed!"
    pause
    exit /b %errorlevel%
)
echo Starting production server...
call npm start
pause
