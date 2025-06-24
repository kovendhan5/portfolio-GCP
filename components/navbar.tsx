"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Education", href: "/#education" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Blog", href: "/blog" },
    { name: "Freelance", href: "/freelance" },    { name: "Contact", href: "/#contact" },
  ]
  
  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      // Hash links are only active when on the home page
      return pathname === "/"
    }
    if (href === "/blog" && pathname.startsWith("/blog")) {
      return true
    }
    if (href === "/projects" && pathname.startsWith("/projects")) {
      return true
    }
    if (href === "/freelance" && pathname.startsWith("/freelance")) {
      return true
    }
    return pathname === href
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md",
        scrolled ? "bg-background/80 shadow-lg shadow-primary/5" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600"
            >
              Kovendhan P
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault()
                    // If we're not on the home page, navigate to home first
                    if (pathname !== "/") {
                      router.push("/")
                      // Wait a bit for navigation to complete, then scroll
                      setTimeout(() => {
                        const targetId = link.href.substring(2)
                        document.querySelector(`#${targetId}`)?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }, 100)
                    } else {
                      // If we're on home page, scroll to section
                      const targetId = link.href.substring(2)
                      document.querySelector(`#${targetId}`)?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}            <button
              className="ml-4 md:hidden p-2 rounded-md text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10",
                )}                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault()
                    // If we're not on the home page, navigate to home first
                    if (pathname !== "/") {
                      router.push("/")
                      // Wait a bit for navigation to complete, then scroll
                      setTimeout(() => {
                        const targetId = link.href.substring(2)
                        document.querySelector(`#${targetId}`)?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }, 100)
                    } else {
                      // If we're on home page, scroll to section
                      const targetId = link.href.substring(2)
                      document.querySelector(`#${targetId}`)?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    setMobileMenuOpen(false)
                  } else {
                    setMobileMenuOpen(false)
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
