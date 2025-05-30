"use client"

import type { Project } from "@/data/projects"; // Assuming you have a Project type defined
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface ProjectDetailsProps {
  project: Project
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <motion.div
      className="bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >      <div className="relative aspect-video w-full">
        {/* Prioritize screenshot images for the first 4 projects */}
        {project.id <= 4 ? (
          <Image
            src={project.featuredImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : project.demoLink && project.demoLink !== "#" && !project.demoLink.includes("github.com") ? (
          <iframe
            src={project.demoLink}
            title={project.title + ' Homepage'}
            className="w-full h-full min-h-[300px] border-none rounded"
            style={{ background: '#fff' }}
            loading="lazy"
          />
        ) : (
          <Image
            src={project.featuredImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
            {project.category === "web"
              ? "Web Development"
              : project.category === "mobile"
                ? "Mobile App"
                : project.category === "ai"
                  ? "AI & Machine Learning"
                  : project.category === "devops"
                    ? "DevOps"
                    : "Cloud Computing"}
          </span>
          <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
            {/* Consider adding Calendar icon back here if needed, import it in this client component */}
            {project.date}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {/* Consider adding Tag icon back here if needed, import it in this client component */}
              {tech}
            </span>
          ))}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <p>{project.longDescription}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            {/* Consider adding ExternalLink icon back here if needed, import it in this client component */}
            Live Demo
          </Link>
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-all duration-300"
          >
            {/* Consider adding Github icon back here if needed, import it in this client component */}
            View Source
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
