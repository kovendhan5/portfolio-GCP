"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Code, Cloud, Database, Server, Terminal, GitBranch, Cpu, Globe } from "lucide-react"

export default function Skills() {
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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "Python", level: "Advanced" },
        { name: "Java", level: "Intermediate" },
        { name: "C", level: "Intermediate" },
        { name: "SQL", level: "Advanced" },
        { name: "HTML", level: "Advanced" },
        { name: "CSS", level: "Advanced" },
        { name: "JavaScript", level: "Intermediate" },
      ],
    },
    {
      title: "Dev Tools & Technologies",
      icon: <Terminal className="h-6 w-6" />,
      skills: [
        { name: "Visual Studio Code", level: "Advanced" },
        { name: "Jupyter Notebook", level: "Advanced" },
        { name: "Docker", level: "Intermediate" },
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Jenkins", level: "Intermediate" },
        { name: "Kubernetes", level: "Basics" },
        { name: "GitHub Actions", level: "Intermediate" },
        { name: "GitLab", level: "Intermediate" },
      ],
    },
    {
      title: "Cloud Platforms",
      icon: <Cloud className="h-6 w-6" />,
      skills: [
        { name: "AWS", level: "Intermediate" },
        { name: "GCP", level: "Basics" },
        { name: "Azure", level: "Basics" },
      ],
    },
    {
      title: "Technical Skills",
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: "CI/CD knowledge", level: "Intermediate" },
        { name: "Networking Protocols", level: "Basics" },
        { name: "Deployment", level: "Advanced" },
        { name: "Containers", level: "Intermediate" },
        { name: "Configuration Management", level: "Basics" },
      ],
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-muted/30 opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency across various domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-border shadow-lg hover:shadow-primary/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary mr-4">{category.icon}</div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span
                        className={
                          [
                            "text-xs font-semibold px-3 py-1 rounded-full border shadow-md",
                            skill.level === "Advanced"
                              ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500"
                              : skill.level === "Intermediate"
                              ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 border-yellow-400"
                              : "bg-gradient-to-r from-red-300 to-red-500 text-red-900 border-red-400"
                          ].join(" ")
                        }
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: "Python", icon: <Terminal className="h-6 w-6" /> },
            { name: "Java", icon: <Code className="h-6 w-6" /> },
            { name: "Docker", icon: <Database className="h-6 w-6" /> },
            { name: "AWS", icon: <Cloud className="h-6 w-6" /> },
            { name: "Git", icon: <GitBranch className="h-6 w-6" /> },
            { name: "React", icon: <Globe className="h-6 w-6" /> },
            { name: "Kubernetes", icon: <Server className="h-6 w-6" /> },
            { name: "CI/CD", icon: <Cpu className="h-6 w-6" /> },
            { name: "Azure", icon: <Cloud className="h-6 w-6" /> },
            { name: "GCP", icon: <Cloud className="h-6 w-6" /> },
            { name: "JavaScript", icon: <Code className="h-6 w-6" /> },
            { name: "SQL", icon: <Database className="h-6 w-6" /> },
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                {tech.icon}
              </div>
              <span className="mt-2 text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
