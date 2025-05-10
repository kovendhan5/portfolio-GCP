# Deployment Instructions for Kovendhan's Portfolio Website

## Local Testing

1. Build the Docker image:
   ```bash
   docker build -t portfolio:latest .
   ```

2. Run the Docker container locally:
   ```bash
   docker run -d -p 8080:8080 -e PORT=8080 portfolio:latest
   ```

3. Visit http://localhost:8080 to test your website

4. View logs using:
   ```bash
   docker logs <container-id>
   ```

## Google Cloud Run Deployment

1. Set up Google Cloud resources (first time only):
   ```bash
   # Windows
   gcloud artifacts repositories create kovendhan-portfolio --repository-format=docker --location=us-central1 --description="Repository for Kovendhan's portfolio website"
   gcloud iam service-accounts create portfolio-run-sa --display-name="Portfolio Cloud Run Service Account"
   gcloud projects add-iam-policy-binding $(gcloud config get-value project) --member="serviceAccount:portfolio-run-sa@$(gcloud config get-value project).iam.gserviceaccount.com" --role="roles/run.invoker"
   gcloud projects add-iam-policy-binding $(gcloud config get-value project) --member="serviceAccount:portfolio-run-sa@$(gcloud config get-value project).iam.gserviceaccount.com" --role="roles/artifactregistry.reader"
   gcloud services enable artifactregistry.googleapis.com
   gcloud services enable run.googleapis.com
   ```

2. Tag and push the Docker image to Google Artifact Registry:
   ```bash
   # Set your region and project ID
   $REGION="us-central1"
   $PROJECT_ID=$(gcloud config get-value project)
   
   # Configure Docker for Google Cloud authentication
   gcloud auth configure-docker $REGION-docker.pkg.dev
   
   # Tag the Docker image
   docker tag portfolio:latest $REGION-docker.pkg.dev/$PROJECT_ID/kovendhan-portfolio/portfolio:latest
   
   # Push the Docker image
   docker push $REGION-docker.pkg.dev/$PROJECT_ID/kovendhan-portfolio/portfolio:latest
   ```

3. Update the cloud-run-service.yaml file:
   ```bash
   # Update the image path
   sed -i "s|REGION-docker.pkg.dev/PROJECT_ID/kovendhan-portfolio/portfolio:latest|$REGION-docker.pkg.dev/$PROJECT_ID/kovendhan-portfolio/portfolio:latest|g" cloud-run-service.yaml
   ```

4. Deploy to Cloud Run:
   ```bash
   gcloud run services replace cloud-run-service.yaml --region=$REGION
   ```

5. Allow unauthenticated access:
   ```bash
   gcloud run services add-iam-policy-binding kovendhan-portfolio --member="allUsers" --role="roles/run.invoker" --region=$REGION
   ```

6. Get the service URL:
   ```bash
   gcloud run services describe kovendhan-portfolio --region=$REGION --format="value(status.url)"
   ```

## Troubleshooting

If you encounter issues with static files not being found, check:

1. The Nginx configuration in `default.conf.template`
2. The static file locations in the Docker container
3. Make sure the path mappings in the Nginx configuration match the actual file structure

## Useful Commands

- View Docker container logs: `docker logs <container-id>`
- SSH into the container: `docker exec -it <container-id> /bin/sh`
- List running containers: `docker ps`
- Stop a container: `docker stop <container-id>`
