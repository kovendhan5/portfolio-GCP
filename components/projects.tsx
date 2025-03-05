"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Search } from "lucide-react"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = sectionRef.current
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const projects = [
    {
      id: 1,
      title: "Pixelated Image Detection and Correction Using Machine Learning",
      description:
        "Designed a machine learning solution using CNNs to detect and enhance pixelated image regions. Applied super-resolution techniques for image restoration, achieving high-quality results with 95% accuracy. Project certified by Intel.",
      image: "/placeholder.svg?height=400&width=600",
      category: "machine-learning",
      technologies: ["Python", "TensorFlow", "CNN", "Image Processing"],
      demoLink: "#",
      githubLink: "#",
      date: "Apr 2024 - Jul 2024",
    },
    {
      id: 2,
      title: "Website Development for IEEE Techx Event",
      description:
        "Developed the official website for the IEEE Techx event, showcasing details and schedules. Ensured a user-friendly experience with features like technology demos and expert-led sessions.",
      image: "/placeholder.svg?height=400&width=600",
      category: "web-development",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      demoLink: "#",
      githubLink: "#",
      date: "Aug 2024",
    },
    {
      id: 3,
      title: "Student Code and Notes Sharing Website",
      description:
        "Created a website for students to share programming code and notes using the Google Drive API. Built with Google Apps Script, facilitating easy file uploads and access management.",
      image: "/placeholder.svg?height=400&width=600",
      category: "web-development",
      technologies: ["JavaScript", "Google Apps Script", "HTML", "CSS"],
      demoLink: "#",
      githubLink: "#",
      date: "Jun 2024",
    },
    {
      id: 4,
      title: "DevOps Project: Website Deployment on GCP",
      description:
        "Deployed a React-based website on GCP using Docker and Kubernetes with automated CI/CD pipelines via GitHub Actions. Managed containerized applications, ensuring scalability and reliability with Kubernetes clusters and GCP services.",
      image: "/placeholder.svg?height=400&width=600",
      category: "cloud-devops",
      technologies: ["Docker", "Kubernetes", "GCP", "GitHub Actions", "React"],
      demoLink: "#",
      githubLink: "#",
      date: "Jan 2025 - Feb 2025",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work and projects that showcase my skills and expertise.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter("web-development")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "web-development"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Web Development
          </button>
          <button
            onClick={() => setFilter("machine-learning")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "machine-learning"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Machine Learning
          </button>
          <button
            onClick={() => setFilter("cloud-devops")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "cloud-devops"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Cloud & DevOps
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{
                animationDelay: `${0.2 + project.id * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <Link
                      href={project.demoLink}
                      className="p-3 rounded-full bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                    <Link
                      href={project.githubLink}
                      className="p-3 rounded-full bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      aria-label="GitHub Repository"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <button
                      className="p-3 rounded-full bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      aria-label="View Details"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">{project.date}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {project.category === "web-development"
                      ? "Web Development"
                      : project.category === "machine-learning"
                        ? "Machine Learning"
                        : "Cloud & DevOps"}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

