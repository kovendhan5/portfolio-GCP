@echo off
ECHO ======================================================
ECHO Docker Cleanup and Verification Script for Portfolio
ECHO ======================================================

ECHO.
ECHO Checking for running portfolio containers...
docker ps --filter "ancestor=portfolio:latest" --format "{{.ID}} - {{.Status}}"

ECHO.
ECHO Would you like to stop all running portfolio containers? (Y/N)
SET /P CONFIRM_STOP=
IF /I "%CONFIRM_STOP%"=="Y" (
  ECHO Stopping all portfolio containers...
  FOR /F "tokens=* USEBACKQ" %%F IN (`docker ps --filter "ancestor=portfolio:latest" --format "{{.ID}}"`) DO (
    ECHO Stopping container %%F...
    docker stop %%F
  )
)

ECHO.
ECHO Checking for dangling images...
docker images --filter "dangling=true" --format "{{.ID}} - {{.Repository}}:{{.Tag}} - {{.Size}}"

ECHO.
ECHO Would you like to remove dangling images? (Y/N)
SET /P CONFIRM_CLEAN=
IF /I "%CONFIRM_CLEAN%"=="Y" (
  ECHO Removing dangling images...
  docker image prune -f
)

ECHO.
ECHO Verifying the latest portfolio image...
docker images portfolio:latest --format "ID: {{.ID}} - Created: {{.CreatedSince}} - Size: {{.Size}}"

ECHO.
ECHO Would you like to run the portfolio container for testing? (Y/N)
SET /P CONFIRM_RUN=
IF /I "%CONFIRM_RUN%"=="Y" (
  ECHO Starting portfolio container on port 8080...
  docker run -d -p 8080:8080 -e PORT=8080 portfolio:latest
  
  ECHO.
  ECHO Container started. Please check http://localhost:8080
  ECHO To view logs, run view-logs.bat
)
