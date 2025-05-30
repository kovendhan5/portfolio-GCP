import ProjectDetails from "@/components/project-details"; // Import the new client component
import { projects } from "@/data/projects"
import {
    ArrowLeft as LucideArrowLeft,
} from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  // Return all project slugs for static generation
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Keep icon fallback for the error case link
const ArrowLeft = LucideArrowLeft || (() => <span />)

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const project = projects.find((p) => p.slug === slug)

  // Runtime check for invalid or undefined project fields
  if (!project ||
      typeof project.title !== 'string' ||
      typeof project.longDescription !== 'string' ||
      typeof project.featuredImage !== 'string' ||
      !Array.isArray(project.technologies) ||
      typeof project.demoLink !== 'string' ||
      typeof project.githubLink !== 'string') {
    // Log the error during build or in browser
    console.error('Invalid or missing project data for slug:', slug, project)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Data Error</h1>
          <p className="text-muted-foreground mb-6">This project has missing or invalid data and cannot be rendered.</p>
          <Link href="/projects" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> {/* Keep icon here for error case */}
            Back to Projects
          </Link>
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
              <ArrowLeft className="mr-2 h-4 w-4" /> {/* Keep icon here */}
              Back to Projects
            </Link>

            {/* Render the client component, passing the project data */}
            <ProjectDetails project={project} />

          </div>
        </div>
      </div>
    </div>
  )
}
