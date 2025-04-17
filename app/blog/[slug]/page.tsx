import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts } from "@/data/blog-posts"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Check if blogPosts is an array before using array methods
  const post = Array.isArray(blogPosts) 
    ? blogPosts.find((post) => post.slug === params.slug)
    : null

  if (!post) {
    return {
      title: "Blog Post Not Found | Kovendhan P",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Kovendhan P`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  // Ensure blogPosts is an array before mapping
  if (!Array.isArray(blogPosts)) {
    console.warn('blogPosts is not an array');
    return [];
  }
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Check if blogPosts is an array before using array methods
  const post = Array.isArray(blogPosts)
    ? blogPosts.find((post) => post.slug === params.slug)
    : null

  if (!post) {
    notFound()
  }

  // Convert markdown-like content to HTML (simple version)
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => {
        if (line.startsWith("# ")) {
          return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`
        } else if (line.startsWith("## ")) {
          return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.substring(3)}</h2>`
        } else if (line.startsWith("### ")) {
          return `<h3 class="text-xl font-bold mt-5 mb-2">${line.substring(4)}</h3>`
        } else if (line.startsWith("- ")) {
          return `<li class="ml-6 list-disc">${line.substring(2)}</li>`
        } else if (line.trim() === "") {
          return "<br />"
        } else {
          return `<p class="my-3">${line}</p>`
        }
      })
      .join("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <div className="bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border shadow-lg">
              <div className="relative aspect-video w-full">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {post.publishedDate}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
