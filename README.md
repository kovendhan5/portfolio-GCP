# Portfolio Website

This is a personal portfolio website built with Next.js, Tailwind CSS, and TypeScript. It showcases projects, skills, and experience. The site is deployed on Google Cloud Run at [https://kovendhan-portfolio-74857330583.us-central1.run.app](https://kovendhan-portfolio-74857330583.us-central1.run.app).

## Features
  
*   Project showcase with filtering
*   Blog section
*   Contact form
*   Responsive design
*   Docker containerized deployment
*   Cloud-based hosting with Google Cloud Run

## Tech Stack

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS
*   **Server:** Nginx for static file serving
*   **Containerization:** Docker
*   **Deployment:** Google Cloud Run

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/kovendhan5/portfolio-GCP.git
    cd portfolio-GCP
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful Scripts

This repository contains several helper scripts to make deployment and management easier:

* `deploy.bat` - Builds and deploys the application to Google Cloud Run (Windows)
* `deploy.sh` - Builds and deploys the application to Google Cloud Run (Linux/Mac)
* `manage-docker.bat` - Helps manage Docker containers (stop, clean up, and test locally)
* `view-logs.bat` - Views logs from the running Docker container
* `check-status.bat` - Checks status of the deployed Google Cloud Run service

For detailed deployment instructions, see the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## Deployment

### Google Cloud Run Deployment (Recommended)

This project is successfully deployed on Google Cloud Run using Docker containers. You can view the live deployment at [https://kovendhan-portfolio-74857330583.us-central1.run.app](https://kovendhan-portfolio-74857330583.us-central1.run.app).

To deploy your own instance: 

1. Make sure you have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and configured
2. Set up your Google Cloud project and enable the necessary APIs:
   ```bash
   gcloud services enable artifactregistry.googleapis.com run.googleapis.com
   ```
3. Build and deploy using the deployment script:
   ```bash
   # For Linux/Mac
   chmod +x deploy.sh
   ./deploy.sh
   
   # For Windows
   deploy.bat
   ```
4. The deployment script will output the URL where your portfolio is available

### Deployment Scripts

This repository includes several deployment scripts:

1. **deploy.bat** (Windows) - One-click deployment script for Windows users
2. **deploy.sh** (Linux/Mac) - One-click deployment script for Linux/Mac users
3. **setup-cloud.sh** - Sets up necessary Google Cloud resources
4. **cloud-run-service.yaml** - Configuration file for Google Cloud Run service

### Manual Deployment Steps

If you prefer to deploy manually:

#### Testing Locally

You can test the Docker container locally before deploying to Google Cloud Run:

1. Build the Docker image:
   ```bash
   docker build -t portfolio:latest .
   ```

2. Run the Docker container locally:
   ```bash
   docker run -d --name portfolio-local -p 8080:8080 -e PORT=8080 portfolio:latest
   ```

3. Open [http://localhost:8080](http://localhost:8080) in your browser to test.

4. Or use the included helper script (Windows):
   ```cmd
   manage-docker.bat test
   ```

5. When done testing, stop and remove the container:
   ```bash
   docker stop portfolio-local
   docker rm portfolio-local
   ```

#### Manual Deployment to Google Cloud Run

1. Build the Docker image:
   ```bash
   docker build -t portfolio:latest .
   ```
2. Configure Docker to authenticate with Google Artifact Registry:
   ```bash
   gcloud auth configure-docker [REGION]-docker.pkg.dev
   ```
3. Create an Artifact Registry repository:
   ```bash
   gcloud artifacts repositories create kovendhan-portfolio --repository-format=docker --location=[REGION] --description="Repository for portfolio website"
   ```
4. Push to Google Artifact Registry:
   ```bash
   docker tag portfolio:latest [REGION]-docker.pkg.dev/[PROJECT_ID]/kovendhan-portfolio/portfolio:latest
   docker push [REGION]-docker.pkg.dev/[PROJECT_ID]/kovendhan-portfolio/portfolio:latest
   ```
5. Create a service account for Cloud Run:
   ```bash
   gcloud iam service-accounts create portfolio-run-sa --display-name="Portfolio Cloud Run Service Account"
   gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:portfolio-run-sa@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/run.invoker"
   gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:portfolio-run-sa@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/artifactregistry.reader"
   ```
6. Deploy to Cloud Run:
   ```bash
   gcloud run services replace cloud-run-service.yaml --region=[REGION]
   ```
7. Make the service publicly accessible:
   ```bash
   gcloud run services add-iam-policy-binding kovendhan-portfolio --member="allUsers" --role="roles/run.invoker" --region=[REGION]
   ```

### Docker Configuration

The project uses Docker with a multi-stage build process:
1. First stage uses Node.js to build the Next.js application
2. Second stage uses Nginx to serve the static files
3. Special configurations in the Nginx setup ensure proper handling of static assets

### Alternative Deployment Options

You can also deploy to Vercel or Firebase Hosting. Refer to their respective documentation for deployment instructions.

## Troubleshooting & Technical Notes

### Static File Serving

The portfolio site relies on properly configured Nginx rules to handle static assets. Key configurations include:

1. **Next.js Static Files**: The `_next/static` path requires special handling to serve CSS, JS, and other assets correctly
   ```nginx
   location ~* ^/static/(.*)$ {
     alias /usr/share/nginx/html/_next/static/$1;
     add_header Cache-Control "public, max-age=31536000, immutable";
   }
   ```

2. **Image Files**: Image files are served either from the root or the `/extra` directory
   ```nginx
   location ~ ^/[^/]+\.(jpg|jpeg|png|gif|ico|svg)$ {
     root /usr/share/nginx/html;
     try_files $uri /extra/$uri =404;
   }
   ```

3. **Directory Structure**: The Docker build ensures that all required directories are created:
   ```dockerfile
   COPY --from=builder /app/out /usr/share/nginx/html
   COPY --from=builder /app/public/extra /usr/share/nginx/html/extra
   RUN mkdir -p /usr/share/nginx/html/_next
   ```

### Common Issues

- **Static Assets Not Loading**: Check the Nginx configuration in `default.conf.template`
- **Deployment Errors**: Make sure all required APIs are enabled in your Google Cloud project
- **Docker Build Failures**: Ensure that you have sufficient memory for the Next.js build process
- **Local Testing Issues**: Use the `manage-docker.bat` script to clean up any stale containers

## Project Links

*   **Live Website (Google Cloud Run):** [https://kovendhan-portfolio-74857330583.us-central1.run.app](https://kovendhan-portfolio-74857330583.us-central1.run.app)
*   **Alternative URL:** https://kovendhan.xyz/
*   **GitHub Repository:** https://github.com/kovendhan5/portfolio-GCP

## License

This project is licensed under the MIT License.
