"use client"

import { useEffect, useRef } from "react"
import { Trophy } from "lucide-react"

export default function Achievements() {
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

  const achievements = [
    {
      id: 1,
      title: "3rd Place at IEEE TECHX Hackathon",
      description:
        "Recognized for innovative solution and technical implementation in a competitive hackathon environment.",
      year: "2024",
    },
    {
      id: 2,
      title: "2nd Place at IEEE Robothon (Idea Presentation)",
      description: "Awarded for creative concept and effective presentation of robotics solution.",
      year: "2024",
    },
    {
      id: 3,
      title: "2nd Place at Tech Fest 24 (Web Design Competition)",
      description: "Recognized for exceptional web design skills and creative implementation.",
      year: "2024",
    },
  ]

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 bg-muted/30 opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Recognition and awards that highlight my accomplishments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
              style={{
                animationDelay: `${0.2 + index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{achievement.year}</p>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

