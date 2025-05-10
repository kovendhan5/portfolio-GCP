@echo off
ECHO ======================================================
ECHO Docker Container Logs for Portfolio Website
ECHO ======================================================

ECHO.
ECHO Finding the portfolio container...
FOR /F "tokens=* USEBACKQ" %%F IN (`docker ps --filter "ancestor=portfolio:latest" --format "{{.ID}}"`) DO (
  SET CONTAINER_ID=%%F
)

IF "%CONTAINER_ID%"=="" (
  ECHO No running container found for portfolio:latest image.
  ECHO Make sure you have run:
  ECHO docker run -d -p 8080:8080 -e PORT=8080 portfolio:latest
  EXIT /B 1
)

ECHO.
ECHO Viewing logs for container %CONTAINER_ID%...
docker logs -f %CONTAINER_ID%
