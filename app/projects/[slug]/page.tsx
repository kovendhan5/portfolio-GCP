import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from "lucide-react"
import { projects } from "@/data/projects"
import { motion } from "framer-motion"

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

interface ProjectPageProps {
  params: { slug: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/90 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <motion.div
              className="bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video w-full">
                {project.demoLink && project.demoLink !== "#" ? (
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
                    <Calendar className="mr-1 h-3 w-3" />
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
                      <Tag className="mr-1 h-3 w-3" />
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
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-all duration-300"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
