#!/bin/bash
# Deployment script for portfolio to Google Cloud Run

# Configuration
PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"  # Change this to your preferred region
REPOSITORY="kovendhan-portfolio"
IMAGE_NAME="portfolio"
SERVICE_NAME="kovendhan-portfolio"

# Step 1: Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME:latest .

# Step 2: Configure Docker to use Google Cloud authentication
echo "Configuring Docker authentication..."
gcloud auth configure-docker $REGION-docker.pkg.dev

# Step 3: Tag the Docker image for Google Artifact Registry
echo "Tagging Docker image for Google Artifact Registry..."
docker tag $IMAGE_NAME:latest $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$IMAGE_NAME:latest

# Step 4: Push the Docker image to Google Artifact Registry
echo "Pushing Docker image to Google Artifact Registry..."
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$IMAGE_NAME:latest

# Step 5: Update the cloud-run-service.yaml file with correct image path
echo "Updating Cloud Run service configuration..."
sed -i "s|REGION-docker.pkg.dev/PROJECT_ID/kovendhan-portfolio/portfolio:latest|$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$IMAGE_NAME:latest|g" cloud-run-service.yaml

# Step 6: Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run services replace cloud-run-service.yaml --region=$REGION

# Step 7: Allow unauthenticated access (if desired)
echo "Allowing public access to the service..."
gcloud run services add-iam-policy-binding $SERVICE_NAME \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --region=$REGION

# Display the service URL
echo "Deployment complete! Your service is available at:"
gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)"
