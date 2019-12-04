@echo off
rem ---Dependency manager install begin---
echo Install dependencies...
if not defined USE_DEPENDENT_MANAGER_INSTALL set USE_DEPENDENT_MANAGER_INSTALL=true
if %USE_DEPENDENT_MANAGER_INSTALL%==true call npm i -g npm
if %USE_DEPENDENT_MANAGER_INSTALL%==true call npm i
rem ---Dependency manager install end---

rem ---Build begin---
call npm run build
rem ---Build end---

rem ---Archive files begin---
echo Archive files...
if exist _tmp.7z rd _tmp.7z
cd dist
7z a ..\_tmp.7z .
cd ..
move _tmp.7z app.7z
rem ---Archive files end---
