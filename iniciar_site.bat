@echo off
set PATH=%PATH%;C:\Program Files\nodejs
cd /d "e:\SERVIDOR\arch-office-site"
npm install
npx next dev -p 3000 --webpack
pause
