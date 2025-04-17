"use client"

import { useEffect, useRef } from "react"
import { Briefcase, Calendar } from "lucide-react"

export default function Experience() {
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

  const experiences = [
    {
      id: 1,
      title: "Web Development Intern",
      company: "TechnoHacks EduTech",
      period: "Mar 2024 - Apr 2024",
      description:
        "Developed a responsive static website and built an e-commerce website with front-end, back-end, and payment integration.",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Payment API"],
    },
    {
      id: 2,
      title: "Full Stack Development Intern",
      company: "Raja Technologies",
      period: "May 2024 - Jun 2024",
      description: "Developed custom portfolio websites using HTML, CSS, JavaScript, and React.js.",
      skills: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Design"],
    },
    {
      id: 3,
      title: "Freelancer as Cloud & DevOps Engineer, Full Stack Developer",
      company: "Self-employed",
      period: "Jul 2024 - Present",
      description:
        "Assisted friends in various web development projects and provided technical guidance in cloud & DevOps concepts. Managed cloud infrastructure using AWS, Azure, and Google Cloud. Implemented CI/CD pipelines with Docker and Jenkins.",
      skills: ["AWS", "Azure", "GCP", "Docker", "Jenkins", "CI/CD", "Full Stack Development"],
    },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            My professional journey and work experience in the tech industry.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                style={{
                  animationDelay: `${0.2 + index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 z-10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-background"></div>
                </div>

                {/* Content */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div
                    className={`bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Briefcase className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                    </div>
                    <div className="flex items-center mb-4">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{exp.company}</h4>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
