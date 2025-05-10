# Portfolio Website

This is a personal portfolio website built with Next.js, Tailwind CSS, and TypeScript. It showcases projects, skills, and experience.

## Features

*   Project showcase with filtering
*   Blog section
*   Contact form
*   Responsive design

## Tech Stack

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS
*   **Deployment:** Firebase / GCP (depending on configuration)

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

This repository contains several scripts to help with Docker management and Google Cloud Run deployment:

* `deploy.bat` - Builds and deploys the application to Google Cloud Run
* `manage-docker.bat` - Helps manage Docker containers (stop, clean up, and test locally)
* `view-logs.bat` - Views logs from the running Docker container
* `check-status.bat` - Checks status of the deployed Google Cloud Run service

## Deployment

### Google Cloud Run Deployment (Recommended)

This project is set up to be deployed on Google Cloud Run using Docker containers:

1. Make sure you have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and configured
2. Run the setup script to create necessary Google Cloud resources:
   ```bash
   chmod +x setup-cloud.sh
   ./setup-cloud.sh
   ```
3. Build and deploy using the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```
4. The deployment script will output the URL where your portfolio is available

### Manual Deployment Steps

If you prefer to deploy manually:

#### Windows Users

Run the included deployment batch script:
```cmd
deploy.bat
```

#### Testing Locally

1. Build the Docker image:
   ```bash
   docker build -t portfolio:latest .
   ```
2. Run the Docker container locally:
   ```bash
   docker run -d -p 8080:8080 -e PORT=8080 portfolio:latest
   ```
3. Open [http://localhost:8080](http://localhost:8080) in your browser to test.

#### Manual Deployment to Google Cloud Run

1. Build the Docker image:
   ```bash
   docker build -t portfolio:latest .
   ```
2. Push to Google Artifact Registry:
   ```bash
   docker tag portfolio:latest [REGION]-docker.pkg.dev/[PROJECT_ID]/kovendhan-portfolio/portfolio:latest
   docker push [REGION]-docker.pkg.dev/[PROJECT_ID]/kovendhan-portfolio/portfolio:latest
   ```
3. Deploy to Cloud Run:
   ```bash
   gcloud run services replace cloud-run-service.yaml --region=[REGION]
   ```

You can also deploy to Vercel or Firebase Hosting. Refer to their respective documentation for deployment instructions.

## Project Links

*   **Live Website:** https://kovendhan.xyz/
*   **GitHub Repository:** https://github.com/kovendhan5/portfolio-GCP
