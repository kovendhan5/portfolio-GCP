"use client"

import { useEffect, useRef } from "react"
import { GraduationCap, Calendar } from "lucide-react"

export default function Education() {
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

  const educations = [
    {
      id: 1,
      degree: "B.Tech, Information Technology",
      institution: "Jeppiaar Institute Of Technology",
      period: "Sep 2022 - Present",
      description: "CGPA: 7.83 (up to 5th Semester)",
      courses: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Web Development",
        "Cloud Computing",
        "Cybersecurity",
      ],
    },
    {
      id: 2,
      degree: "Higher Secondary Education",
      institution: "Marutham Matric Hr Sec School",
      period: "Jun 2019 - May 2021",
      description: "Percentage: 81.92%",
      courses: ["Mathematics", "Physics", "Chemistry", "Computer Science", "English"],
    },
  ]

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 bg-muted/30 opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            My academic background and educational qualifications.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600"></div>

          <div className="space-y-12">
            {educations.map((edu, index) => (
              <div
                key={edu.id}
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
                      <GraduationCap className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                    </div>
                    <div className="flex items-center mb-4">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-muted-foreground">{edu.period}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{edu.institution}</h4>
                    <p className="text-muted-foreground mb-4">{edu.description}</p>
                    <div>
                      <h5 className="font-medium mb-2">Key Courses:</h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, courseIndex) => (
                          <span key={courseIndex} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {course}
                          </span>
                        ))}
                      </div>
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

