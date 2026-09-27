@echo off
REM ============================================================
REM  tally 选票业务本地服务启动器（Windows）
REM
REM  用法：
REM    run.bat                  自动选端口（默认先试 5000，占用则换随机端口）
REM    run.bat 8080             指定端口（占用时自动换随机端口）
REM    run.bat 8080 strict      指定端口必须可用，否则退出
REM
REM  脚本职责：
REM    1. 依次寻找可用解释器（python / py -3）；
REM    2. 调用 main.py，由它完成端口探测、随机切换与打印实际访问地址；
REM    3. 解析窗口保持打开，便于查看日志。
REM ============================================================
setlocal
set "HERE=%~dp0"
set "PYEXE="

where python >nul 2>nul && set "PYEXE=python"
if not defined PYEXE (
  where py >nul 2>nul && set "PYEXE=py -3"
)
if not defined PYEXE (
  echo [tally] 未找到 Python 解释器，请先安装 Python 3.10+ 并加入 PATH。
  pause
  exit /b 1
)

set "PORT=%~1"
if "%PORT%"=="" set "PORT=5000"
set "STRICT="
if /I "%~2"=="strict" set "STRICT=--strict-port"

echo [tally] 使用解释器：%PYEXE%
echo [tally] 首选端口：%PORT%
%PYEXE% "%HERE%main.py" --port %PORT% %STRICT%
set "EXITCODE=%ERRORLEVEL%"
echo.
echo [tally] 服务已退出（exit=%EXITCODE%）。
pause
endlocal
