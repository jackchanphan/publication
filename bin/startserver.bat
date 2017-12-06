@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~fs0 h",0)(window.close)&&exit
:begin
taskkill -f /IM node.exe
npm start