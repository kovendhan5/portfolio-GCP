export interface Service {
  id: number
  title: string
  icon: string
  description: string
  features: string[]
  technologies: string[]
  price: string
  timeline: string
  category: "development" | "devops" | "automation" | "security" | "consulting"
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  image?: string
  projectType: string
}

export interface Achievement {
  icon: string
  title: string
  description: string
  metric?: string
}

export const services: Service[] = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    icon: "Globe",
    description: "End-to-end web application development with modern frameworks and scalable architecture.",
    features: [
      "React.js & Next.js Applications",
      "Node.js & Express.js Backend",
      "Database Design & Integration",
      "RESTful API Development",
      "Authentication & Security",
      "Responsive UI/UX Design",
      "Performance Optimization",
      "SEO Implementation"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "Tailwind CSS"],
    price: "Starting at $2,500",
    timeline: "2-6 weeks",
    category: "development"
  },
  {
    id: 2,
    title: "Cloud Infrastructure & DevOps",
    icon: "Cloud",
    description: "Scalable cloud solutions with automated deployment and infrastructure as code.",
    features: [
      "AWS/GCP/Azure Cloud Setup",
      "Docker Containerization",
      "Kubernetes Orchestration",
      "CI/CD Pipeline Implementation",
      "Infrastructure as Code (Terraform)",
      "Monitoring & Logging Solutions",
      "Auto-scaling Configuration",
      "Security Best Practices"
    ],
    technologies: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Jenkins"],
    price: "Starting at $1,800",
    timeline: "1-4 weeks",
    category: "devops"
  },
  {
    id: 3,
    title: "API Development & Integration",
    icon: "Server",
    description: "Robust API development and third-party service integrations for seamless connectivity.",
    features: [
      "RESTful API Development",
      "GraphQL Implementation",
      "Third-party API Integration",
      "Microservices Architecture",
      "API Documentation (OpenAPI/Swagger)",
      "Rate Limiting & Security",
      "API Gateway Configuration",
      "Webhook Implementation"
    ],
    technologies: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "JWT", "OpenAPI"],
    price: "Starting at $1,200",
    timeline: "1-3 weeks",
    category: "development"
  },
  {
    id: 4,
    title: "Database Design & Optimization",
    icon: "Database",
    description: "Efficient database architecture and performance optimization for your applications.",
    features: [
      "Database Schema Design",
      "Query Optimization",
      "Data Migration Services",
      "Backup & Recovery Solutions",
      "Performance Monitoring",
      "Scaling Strategies",
      "Data Warehousing",
      "ETL Pipeline Development"
    ],
    technologies: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", "InfluxDB"],
    price: "Starting at $800",
    timeline: "1-2 weeks",
    category: "development"
  },
  {
    id: 5,
    title: "Process Automation & Scripting",
    icon: "Bot",
    description: "Custom automation solutions to streamline your business processes and workflows.",
    features: [
      "Business Process Automation",
      "Data Processing Scripts",
      "Web Scraping Solutions",
      "Report Generation",
      "System Integration",
      "Task Scheduling",
      "Email Automation",
      "File Processing Automation"
    ],
    technologies: ["Python", "PowerShell", "Bash", "Selenium", "BeautifulSoup", "Pandas", "Airflow"],
    price: "Starting at $600",
    timeline: "1-2 weeks",
    category: "automation"
  },
  {
    id: 6,
    title: "Security Assessment & Testing",
    icon: "Shield",
    description: "Comprehensive security assessment and vulnerability testing for your applications.",
    features: [
      "Vulnerability Assessment",
      "Penetration Testing",
      "Security Code Review",
      "Compliance Auditing (OWASP, SOC2)",
      "Security Training & Consultation",
      "Incident Response Planning",
      "GDPR Compliance Assessment",
      "Security Architecture Review"
    ],
    technologies: ["Kali Linux", "Metasploit", "Burp Suite", "OWASP ZAP", "Nessus", "Wireshark"],
    price: "Starting at $1,500",
    timeline: "1-3 weeks",
    category: "security"
  }
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechStart Inc.",
    content: "Kovendhan delivered exceptional work on our web application. His attention to detail and technical expertise exceeded our expectations. The project was delivered on time and within budget.",
    rating: 5,
    projectType: "Full-Stack Development"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder",
    company: "DataFlow Solutions",
    content: "Outstanding cloud infrastructure setup. The deployment process is now seamless and our application scales perfectly. Kovendhan's DevOps expertise saved us countless hours.",
    rating: 5,
    projectType: "Cloud Infrastructure"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "InnovateCorp",
    content: "Professional, reliable, and skilled. Kovendhan transformed our legacy system into a modern, efficient application. The migration was smooth with zero downtime.",
    rating: 5,
    projectType: "System Modernization"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Engineering Lead",
    company: "SecureApp Ltd.",
    content: "Thorough security assessment that identified critical vulnerabilities we missed. Kovendhan provided detailed remediation steps and helped implement security best practices.",
    rating: 5,
    projectType: "Security Assessment"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Operations Director",
    company: "AutoMate Inc.",
    content: "The automation scripts Kovendhan developed saved our team 20+ hours per week. ROI was achieved within the first month. Highly recommend for process optimization.",
    rating: 5,
    projectType: "Process Automation"
  }
]

export const achievements: Achievement[] = [
  {
    icon: "Award",
    title: "50+ Projects Delivered",
    description: "Successfully completed projects across various industries",
    metric: "100% Success Rate"
  },
  {
    icon: "Users",
    title: "25+ Happy Clients",
    description: "Maintained 100% client satisfaction rate",
    metric: "5.0/5.0 Rating"
  },
  {
    icon: "Clock",
    title: "On-Time Delivery",
    description: "98% of projects delivered on or before deadline",
    metric: "98% On-Time"
  },
  {
    icon: "Star",
    title: "Industry Recognition",
    description: "Consistently rated 5 stars by clients",
    metric: "Top 1% Freelancer"
  }
]

export const techStack = [
  { 
    category: "Frontend", 
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js", "Angular"] 
  },
  { 
    category: "Backend", 
    techs: ["Node.js", "Express.js", "Python", "FastAPI", "Java", "Spring Boot", "Django"] 
  },
  { 
    category: "Database", 
    techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", "InfluxDB", "Cassandra"] 
  },
  { 
    category: "Cloud & DevOps", 
    techs: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible"] 
  },
  { 
    category: "CI/CD & Tools", 
    techs: ["GitHub Actions", "Jenkins", "GitLab CI", "CircleCI", "Prometheus", "Grafana"] 
  },
  { 
    category: "Security & Testing", 
    techs: ["Jest", "Cypress", "Selenium", "OWASP", "Burp Suite", "Metasploit", "Wireshark"] 
  }
]

export const workProcess = [
  {
    step: "1",
    title: "Discovery & Planning",
    description: "Understanding your requirements, goals, and technical constraints through detailed consultation",
    duration: "1-2 days"
  },
  {
    step: "2",
    title: "Design & Architecture",
    description: "Creating detailed technical specifications, system design, and project roadmap",
    duration: "2-3 days"
  },
  {
    step: "3",
    title: "Development & Testing",
    description: "Agile development with continuous testing, code reviews, and quality assurance",
    duration: "70% of timeline"
  },
  {
    step: "4",
    title: "Deployment & Support",
    description: "Production deployment with comprehensive documentation and ongoing support",
    duration: "Ongoing"
  }
]
