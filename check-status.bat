@echo off
ECHO ======================================================
ECHO Google Cloud Run Status Check for Portfolio Website
ECHO ======================================================

SET REGION=us-central1
SET SERVICE_NAME=kovendhan-portfolio

ECHO.
ECHO Checking the status of your Cloud Run service...
gcloud run services describe %SERVICE_NAME% --region=%REGION% --format="yaml"

ECHO.
ECHO Service URL:
FOR /F "tokens=* USEBACKQ" %%F IN (`gcloud run services describe %SERVICE_NAME% --region=%REGION% --format="value(status.url)"`) DO (
  ECHO %%F
)

ECHO.
ECHO Checking recent deployments...
gcloud run revisions list --service=%SERVICE_NAME% --region=%REGION% --limit=3

ECHO.
ECHO Checking logs from the last hour...
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=%SERVICE_NAME% AND timestamp>-1h" --limit=10 --format="table(timestamp,severity,textPayload)"
