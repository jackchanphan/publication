@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~fs0 h",0)(window.close)&&exit
:begin
timeout /T 5
start explorer "http://localhost:3000"
exit