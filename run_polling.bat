@echo off
set PATH=%PATH%;C:\Program Files\nodejs
set WATCHPACK_POLLING=true
echo Starting with polling...
call npm run dev
pause
