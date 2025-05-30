"use client"

import { Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

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

  const certifications = [
    {
      id: 1,
      title: "GitHub Foundations",
      issuer: "GitHub",
      date: "2024",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 2,
      title: "Cloud Computing",
      issuer: "NPTEL",
      date: "2023",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 3,
      title: "Ethical Hacking",
      issuer: "NPTEL",
      date: "2023",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 4,
      title: "Foundations of Cyber Security",
      issuer: "Google",
      date: "2024",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 5,
      title: "AWS Badges",
      issuer: "AWS",
      date: "2024",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 6,
      title: "Microsoft Azure Certifications",
      issuer: "Microsoft",
      date: "2024",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 7,
      title: "Java (Basics)",
      issuer: "HackerRank",
      date: "2023",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 8,
      title: "Python Demonstration for Practice Course",
      issuer: "Udemy",
      date: "2023",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
    {
      id: 9,
      title: "AWS for Beginners",
      issuer: "Great Learning",
      date: "2023",
      link: "https://www.linkedin.com/in/kovendhanp/details/certifications/",
    },
  ]

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and credentials that validate my expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
              style={{
                animationDelay: `${0.2 + index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {cert.issuer} • {cert.date}
                  </p>
                  <Link href={cert.link} className="inline-flex items-center text-xs text-primary hover:underline">
                    View Certificate
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
