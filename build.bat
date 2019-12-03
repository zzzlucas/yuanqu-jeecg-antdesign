rem ---Dependent manger install begin---
echo Install dependents...
if %USE_DEPENDENT_MANAGER_INSTALL%==true start /wait "" npm i -g npm ^&^& exit
if %USE_DEPENDENT_MANAGER_INSTALL%==true start /wait "" npm i ^&^& exit
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
