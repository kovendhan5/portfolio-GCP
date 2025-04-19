export interface Project {
  id: number
  title: string
  slug: string
  description: string
  longDescription: string
  featuredImage: string
  category: "web" | "mobile" | "ai" | "devops" | "cloud"
  technologies: string[]
  demoLink: string
  githubLink: string
  date: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pixelated Image Detection and Correction",
    slug: "pixelated-image-detection",
    description: "Machine learning solution using CNNs to detect and enhance pixelated image regions.",
    longDescription:
      "Designed a machine learning solution using Convolutional Neural Networks to detect and enhance pixelated image regions. Applied super-resolution techniques for image restoration, achieving high-quality results with 95% accuracy. Project certified by Intel. The system can automatically identify areas of an image that have been pixelated or are of low quality, and then apply targeted enhancement to improve visual clarity without affecting the rest of the image.",
    featuredImage: "/extra/Screenshot 2025-04-17 152820.png",
    category: "ai",
    technologies: ["Python", "TensorFlow", "CNN", "Image Processing", "OpenCV"],
    demoLink: "https://github.com/kovendhan5/intel-project",
    githubLink: "https://github.com/kovendhan5/intel-project",
    date: "Apr 2024 - Jul 2024",
  },
  {
    id: 2,
    title: "IEEE Techx Event Website",
    slug: "ieee-techx-website",
    description: "Official website for the IEEE Techx event, showcasing details and schedules.",
    longDescription:
      "Developed the official website for the IEEE Techx event, showcasing event details, schedules, speaker information, and registration functionality. Ensured a user-friendly experience with features like technology demos and expert-led sessions. The website included an admin panel for event organizers to update content, manage registrations, and send notifications to attendees. Implemented responsive design to ensure optimal viewing experience across all devices.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "web",
    technologies: ["React", "Next.js", "Tailwind CSS", "Firebase", "Vercel"],
    demoLink: "https://kovendhan5.github.io/IEEE2/TechX/index.html",
    githubLink: "https://github.com/kovendhan5/IEEE2", // Updated GitHub link
    date: "Aug 2024",
  },
  {
    id: 3,
    title: "Student Code and Notes Sharing Platform",
    slug: "student-code-sharing",
    description: "Platform for students to share programming code and notes using the Google Drive API.",
    longDescription:
      "Created a comprehensive platform for students to share programming code and educational notes using the Google Drive API. Built with Google Apps Script, the platform facilitates easy file uploads, access management, and collaboration between students. Features include syntax highlighting for code snippets, version control for documents, commenting functionality, and search capabilities to find relevant resources quickly. The platform also includes authentication to ensure only authorized users can access certain materials.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "web",
    technologies: ["JavaScript", "Google Apps Script", "HTML", "CSS", "Google Drive API"],
    demoLink: "https://script.google.com/macros/s/AKfycbzbSy4WOpBbaDXcwy7ffOoTnuPvrqHMwfQrBtp2iBqE4_-addxGXVod6A47iXT12MIdYA/exec", // Added demo link
    githubLink: "https://github.com/kovendhan5/student-code-sharing",
    date: "Jun 2024",
  },
  {
    id: 4,
    title: "Personal Portfolio Website",
    slug: "portfolio-website",
    description: "My personal portfolio website built with Next.js and Tailwind CSS, hosted on Firebase.",
    longDescription: "A modern, responsive portfolio website to showcase my projects, achievements, and skills. Built with Next.js, React, and Tailwind CSS. Features smooth animations, project filtering, and a blog section. Hosted on Firebase for fast and reliable delivery.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "web",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Firebase"],
    demoLink: "https://kovendhan.xyz/", // Updated demo link
    githubLink: "https://github.com/kovendhan5/portfolio-GCP", // Updated GitHub link
    date: "Apr 2025",
  },
  {
    id: 5,
    title: "DevOps Website Deployment on GCP",
    slug: "devops-gcp-deployment",
    description: "Deployed a React-based website on GCP using Docker and Kubernetes with automated CI/CD pipelines.",
    longDescription:
      "Deployed a React-based website on Google Cloud Platform using Docker and Kubernetes with automated CI/CD pipelines via GitHub Actions. Managed containerized applications, ensuring scalability and reliability with Kubernetes clusters and GCP services. Implemented infrastructure as code using Terraform to provision and manage cloud resources. Set up monitoring and alerting using Prometheus and Grafana to ensure high availability and performance of the application.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "devops",
    technologies: ["Docker", "Kubernetes", "GCP", "GitHub Actions", "React", "Terraform", "Prometheus"],
    demoLink: "https://example.com/demo",
    githubLink: "https://github.com/kovendhan5/devops-gcp-deployment",
    date: "Jan 2025 - Feb 2025",
  },
  {
    id: 6,
    title: "AI-Powered Personal Assistant",
    slug: "ai-personal-assistant",
    description: "Voice-controlled personal assistant using natural language processing and machine learning.",
    longDescription:
      "Developed an AI-powered personal assistant that uses natural language processing and machine learning to understand and respond to voice commands. The assistant can perform tasks such as setting reminders, answering questions, controlling smart home devices, and providing personalized recommendations. Implemented using Python, TensorFlow, and various APIs for weather, news, and other services. The system continuously learns from user interactions to improve accuracy and personalization over time.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "ai",
    technologies: ["Python", "TensorFlow", "NLP", "Speech Recognition", "API Integration"],
    demoLink: "https://example.com/demo",
    githubLink: "https://github.com/kovendhan5/ai-personal-assistant",
    date: "Mar 2025 - May 2025",
  },
  {
    id: 7,
    title: "Cloud-Based Inventory Management System",
    slug: "cloud-inventory-system",
    description: "Scalable inventory management system deployed on AWS with real-time tracking and analytics.",
    longDescription:
      "Designed and implemented a cloud-based inventory management system deployed on AWS that provides real-time tracking, automated reordering, and comprehensive analytics. The system uses serverless architecture with AWS Lambda, DynamoDB for database storage, and API Gateway for RESTful API endpoints. Features include barcode scanning via mobile devices, role-based access control, customizable alerts for low stock, and detailed reporting dashboards for business intelligence.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "cloud",
    technologies: ["AWS", "Serverless", "React", "Node.js", "DynamoDB", "Lambda", "API Gateway"],
    demoLink: "https://example.com/demo",
    githubLink: "https://github.com/kovendhan5/cloud-inventory-system",
    date: "Nov 2024 - Jan 2025",
  },
  {
    id: 8,
    title: "Cross-Platform Mobile Fitness App",
    slug: "mobile-fitness-app",
    description: "Fitness tracking application for iOS and Android with workout plans and progress monitoring.",
    longDescription:
      "Developed a cross-platform mobile fitness application for iOS and Android that provides personalized workout plans, nutrition tracking, and progress monitoring. The app uses React Native for the frontend and Firebase for backend services including authentication, database, and cloud functions. Features include workout video demonstrations, custom workout creation, social sharing capabilities, integration with wearable devices, and gamification elements to encourage user engagement and motivation.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "Google Fit API", "Apple HealthKit"],
    demoLink: "https://example.com/demo",
    githubLink: "https://github.com/kovendhan5/mobile-fitness-app",
    date: "Sep 2024 - Dec 2024",
  },
  {
    id: 9,
    title: "E-commerce Platform with Microservices",
    slug: "ecommerce-microservices",
    description: "Scalable e-commerce platform built with microservices architecture and containerization.",
    longDescription:
      "Built a scalable e-commerce platform using microservices architecture and containerization. Each component (product catalog, shopping cart, user authentication, payment processing, order management) is implemented as a separate service that communicates via API gateways. Deployed on Kubernetes for orchestration with service mesh for inter-service communication. Implemented event-driven architecture using message queues for asynchronous processing and eventual consistency across services.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "devops",
    technologies: ["Microservices", "Docker", "Kubernetes", "Node.js", "MongoDB", "Redis", "RabbitMQ", "Istio"],
    demoLink: "https://example.com/demo",
    githubLink: "https://github.com/kovendhan5/ecommerce-microservices",
    date: "Feb 2025 - Apr 2025",
  },
]
