"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import Hero3D from "./hero-3d"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    const createParticles = () => {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

      const colors = ["#22d3ee", "#a855f7", "#2563eb"]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width

        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.3
        ctx.fill()
      })

      // Connect particles with lines if they are close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = 0.1 * (1 - distance / 100)
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    window.addEventListener("resize", resize)
    resize()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Cloud & DevOps Engineer | Full Stack Developer
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Hi, I&apos;m Kovendhan P
            </motion.h1>            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate about Cloud Platforms, DevOps, Cybersecurity, and Building User-Friendly Web Applications
            </motion.p>
            
            {/* Social Media Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link
                href="https://github.com/Kovendhan5"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">GitHub Profile</span>
              </Link>
              <Link
                href="https://linkedin.com/in/kovendhan-p"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">LinkedIn Profile</span>
              </Link>
            </motion.div>            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/projects"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
              >
                View My Work{" "}
                <ArrowRight className="inline-block ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>              <Link
                href="/freelance"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
              >
                Hire Me{" "}
                <ArrowRight className="inline-block ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full bg-background border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-3xl"></div>
              </div>
              <Hero3D />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-muted-foreground"
        >
          <path
            d="M12 5V19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
