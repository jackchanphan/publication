@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~fs0 h",0)(window.close)&&exit
:begin
set cmd1=bin\startserver.bat 
set cmd2=bin\startbrowser.bat  
start %cmd1%  
start %cmd2%  
