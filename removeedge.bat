@echo off
taskkill /f /im msedge.exe >nul 2>&1
taskkill /f /im edgeupdate.exe >nul 2>&1

cd /d "%ProgramFiles(x86)%\Microsoft\Edge\Application"

for /d %%i in (*) do (
    if exist "%%i\Installer\setup.exe" (
        cd "%%i\Installer"
        setup.exe --uninstall --system-level --force-uninstall
    )
)

rd /s /q "%ProgramFiles(x86)%\Microsoft\Edge"
rd /s /q "%ProgramFiles%\Microsoft\Edge"

echo Done
pause