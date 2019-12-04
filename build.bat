@echo off
rem ---Dependent manger install begin---
echo Install dependents...
if not defined USE_DEPENDENT_MANAGER_INSTALL set USE_DEPENDENT_MANAGER_INSTALL=true
if %USE_DEPENDENT_MANAGER_INSTALL%==true call npm i -g npm
if %USE_DEPENDENT_MANAGER_INSTALL%==true call npm i
rem ---Dependent manger install end---

rem ---Build begin---
start /wait "" npm run build ^&^& exit
rem ---Build end---

rem ---Archive files begin---
echo Archive files...
if exist _tmp.7z rd _tmp.7z
cd dist
7z a ..\_tmp.7z .
cd ..
move _tmp.7z app.7z
rem ---Archive files end---
