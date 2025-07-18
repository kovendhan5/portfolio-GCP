"use client"

import Navbar from "@/components/navbar"
import { useTheme } from "@/components/theme-provider"
import { projects } from "@/data/projects"
import { motion } from "framer-motion"
import { ExternalLink, Github, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all")
  const { theme } = useTheme()

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                My Projects
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Explore my latest work and projects that showcase my skills and expertise in various domains.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { label: "All Projects", value: "all" },
                { label: "Web Development", value: "web" },
                { label: "Mobile Apps", value: "mobile" },
                { label: "AI & Machine Learning", value: "ai" },
                { label: "DevOps", value: "devops" },
                { label: "Cloud Computing", value: "cloud" },
              ].map(({ label, value }) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 shadow-sm
                    ${filter === value
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-primary shadow-lg"
                      : "bg-muted hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:text-white text-muted-foreground border-border"}
                  `}
                >
                  {label}
                </motion.button>
              ))}
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  variants={item}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >                  {/* Project image/preview with overlay */}                  <div className="relative overflow-hidden aspect-video group">
                    {/* Prioritize GitHub screenshot images for projects 1-4 and 9 */}
                    {(project.id <= 4 || project.id === 9) ? (
                      <Image
                        src={project.featuredImage || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : project.githubLink === "https://github.com/kovendhan5/intel-project" ? (
                      <Image
                        src="/extra/Screenshot 2025-04-17 152820.png"
                        alt={project.title + ' Screenshot'}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : project.slug === "ieee-techx-website" && project.demoLink ? (
                      <iframe
                        src={project.demoLink}
                        title={project.title + ' Homepage'}
                        className="w-full h-full min-h-[300px] border-none rounded"
                        style={{ background: '#fff' }}
                        loading="lazy"
                      />
                    ) : project.demoLink && project.demoLink !== "https://script.google.com/macros/s/AKfycbzbSy4WOpBbaDXcwy7ffOoTnuPvrqHMwfQrBtp2iBqE4_-addxGXVod6A47iXT12MIdYA/exec" ? (
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
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <a
                          href={project.demoLink}
                          className="p-3 rounded-full bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                          aria-label="Live Demo"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                        <a
                          href={project.githubLink}
                          className="p-3 rounded-full bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                          aria-label="GitHub Repository"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="p-3 rounded-full bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                          aria-label="View Details"
                          onClick={e => e.stopPropagation()}
                        >
                          <Search className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">{project.date}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {project.category === "web"
                          ? "Web Development"
                          : project.category === "ai"
                            ? "AI & Machine Learning"
                            : project.category === "devops"
                              ? "DevOps"
                              : project.category === "cloud"
                                ? "Cloud Computing"
                                : "Mobile App"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      <Link href={`/projects/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
