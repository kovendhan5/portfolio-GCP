"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/data/blog-posts"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(blogPosts)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.category.toLowerCase().includes(query),
      )
      setFilteredPosts(filtered)
    }
  }, [searchQuery])

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
                Blog
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Thoughts, insights, and tutorials on cloud computing, DevOps, web development, and more.
              </p>
            </div>

            <div className="max-w-md mx-auto mb-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title, tag, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query or browse all articles by clearing the search.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredPosts.map((post) => (
                  <motion.div key={post.id} variants={item}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <Image
                          src={post.featuredImage || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">{post.publishedDate}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {post.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mt-auto pt-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
