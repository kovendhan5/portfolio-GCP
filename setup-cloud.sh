#!/bin/bash
# Setup script for Google Cloud resources

# Configuration
PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"  # Change this to your preferred region
REPOSITORY="kovendhan-portfolio"
SERVICE_ACCOUNT="portfolio-run-sa"

# Step 1: Create Google Artifact Registry repository
echo "Creating Artifact Registry repository..."
gcloud artifacts repositories create $REPOSITORY \
    --repository-format=docker \
    --location=$REGION \
    --description="Repository for Kovendhan's portfolio website"

# Step 2: Create service account if it doesn't exist
if ! gcloud iam service-accounts describe $SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com &> /dev/null; then
    echo "Creating service account..."
    gcloud iam service-accounts create $SERVICE_ACCOUNT \
        --display-name="Portfolio Cloud Run Service Account"
fi

# Step 3: Grant necessary permissions to the service account
echo "Granting necessary permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.invoker"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.reader"

# Step 4: Enable required APIs if not already enabled
echo "Enabling required APIs..."
gcloud services enable artifactregistry.googleapis.com
gcloud services enable run.googleapis.com

echo "Setup complete! You can now run ./deploy.sh to deploy your portfolio."
