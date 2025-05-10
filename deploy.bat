@echo off
ECHO ======================================================
ECHO Google Cloud Run Deployment Script for Portfolio Website
ECHO ======================================================

REM Check if gcloud is installed
WHERE gcloud >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
  ECHO Google Cloud SDK (gcloud) is not installed or not in PATH.
  ECHO Please install it from: https://cloud.google.com/sdk/docs/install
  EXIT /B 1
)

REM Check if Docker is installed
WHERE docker >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
  ECHO Docker is not installed or not in PATH.
  ECHO Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
  EXIT /B 1
)

REM Get the current project ID
FOR /F "tokens=* USEBACKQ" %%F IN (`gcloud config get-value project`) DO (
  SET PROJECT_ID=%%F
)

IF "%PROJECT_ID%"=="" (
  ECHO No Google Cloud project is set. Please run:
  ECHO gcloud config set project YOUR_PROJECT_ID
  EXIT /B 1
)

SET REGION=us-central1
SET REPOSITORY=kovendhan-portfolio
SET IMAGE_NAME=portfolio
SET SERVICE_NAME=kovendhan-portfolio

ECHO.
ECHO Building Docker image...
docker build -t %IMAGE_NAME%:latest .

ECHO.
ECHO Configuring Docker authentication...
gcloud auth configure-docker %REGION%-docker.pkg.dev

ECHO.
ECHO Creating Artifact Registry repository if it doesn't exist...
gcloud artifacts repositories describe %REPOSITORY% --location=%REGION% || (
  gcloud artifacts repositories create %REPOSITORY% --repository-format=docker --location=%REGION% --description="Repository for Kovendhan's portfolio website"
)

ECHO.
ECHO Tagging Docker image for Google Artifact Registry...
docker tag %IMAGE_NAME%:latest %REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY%/%IMAGE_NAME%:latest

ECHO.
ECHO Pushing Docker image to Google Artifact Registry...
docker push %REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY%/%IMAGE_NAME%:latest

ECHO.
ECHO Creating service account if it doesn't exist...
gcloud iam service-accounts describe portfolio-run-sa@%PROJECT_ID%.iam.gserviceaccount.com || (
  gcloud iam service-accounts create portfolio-run-sa --display-name="Portfolio Cloud Run Service Account"
)

ECHO.
ECHO Granting necessary permissions...
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:portfolio-run-sa@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/run.invoker"
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:portfolio-run-sa@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/artifactregistry.reader"

ECHO.
ECHO Enabling required APIs...
gcloud services enable artifactregistry.googleapis.com
gcloud services enable run.googleapis.com

ECHO.
ECHO Updating Cloud Run service configuration...
powershell -Command "(Get-Content cloud-run-service.yaml) -replace 'REGION-docker.pkg.dev/PROJECT_ID/kovendhan-portfolio/portfolio:latest', '%REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY%/%IMAGE_NAME%:latest' | Set-Content cloud-run-service.yaml"

ECHO.
ECHO Deploying to Cloud Run...
gcloud run services replace cloud-run-service.yaml --region=%REGION%

ECHO.
ECHO Allowing public access to the service...
gcloud run services add-iam-policy-binding %SERVICE_NAME% --member="allUsers" --role="roles/run.invoker" --region=%REGION%

ECHO.
ECHO Deployment complete! Your service is available at:
FOR /F "tokens=* USEBACKQ" %%F IN (`gcloud run services describe %SERVICE_NAME% --region=%REGION% --format="value(status.url)"`) DO (
  ECHO %%F
)
