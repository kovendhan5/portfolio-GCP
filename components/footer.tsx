"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="py-10 border-t border-border relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600"
            >
              Kovendhan P
            </Link>
            <p className="mt-4 text-muted-foreground">
              Cloud & DevOps Engineer and Full Stack Developer passionate about creating innovative solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#about")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#projects")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#skills")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/kovendhan5"
                target="_blank"
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                target="_blank"
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                target="_blank"
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="mt-4 text-muted-foreground">
              Email: kovendhan202@gmail.com
              <br />
              Phone: +91 7695882909
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Kovendhan P. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  )
}

