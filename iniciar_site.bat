@echo off
title Arch Office Site
echo Iniciando o Site Local em: http://localhost:3000

REM Adiciona Node.js ao PATH temporariamente para este script
set PATH=%PATH%;C:\Program Files\nodejs

cd /d "%~dp0"
call npm run dev
pause
