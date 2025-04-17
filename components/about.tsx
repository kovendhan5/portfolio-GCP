"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-scale")
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative group flex justify-center items-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-40 h-40 md:w-56 md:h-56 overflow-hidden rounded-full shadow-lg border-4 border-primary/30">
              <Image
                src="/extra/1000000125.jpg"
                alt="Kovendhan P"
                fill
                className="object-cover w-full h-full rounded-full"
                priority
                sizes="(max-width: 768px) 160px, 224px"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Cloud & DevOps Engineer and Full Stack Developer</h3>
            <p className="text-muted-foreground">
              I&apos;m passionate about Cloud & DevOps, Full Stack Development, and Cybersecurity. I enjoy creating
              user-friendly web apps. I am exploring cloud platforms like AWS, Azure, and Google Cloud, while learning
              best practices in DevOps and cybersecurity.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-muted-foreground">kovendhan202@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Phone</h4>
                <p className="text-muted-foreground">+91 7695882909</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-muted-foreground">Cheyyar, Tamil Nadu, India</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-muted-foreground">B.Tech, Information Technology</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/extra/Kovendhan_P.pdf"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                download
                target="_blank"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
