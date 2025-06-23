"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion, useScroll, useTransform } from "framer-motion"
import {
    ArrowRight,
    Award,
    Bot,
    CheckCircle,
    Clock,
    Cloud,
    Database,
    Download,
    Globe,
    Home,
    Mail,
    MessageSquare,
    Phone,
    Server,
    Shield,
    Sparkles,
    Star,
    Users,
    Zap
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function FreelancePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)
    setIsVisible(true)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  }

  const services = [
    {
      title: "Full-Stack Web Development",
      icon: <Globe className="h-8 w-8" />,
      description: "End-to-end web application development with modern frameworks and scalable architecture.",
      features: [
        "React.js & Next.js Applications",
        "Node.js & Express.js Backend",
        "Database Design & Integration",
        "RESTful API Development",
        "Authentication & Security",
        "Responsive UI/UX Design"
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
      price: "Starting at $2,500",
      timeline: "2-6 weeks"
    },
    {
      title: "Cloud Infrastructure & DevOps",
      icon: <Cloud className="h-8 w-8" />,
      description: "Scalable cloud solutions with automated deployment and infrastructure as code.",
      features: [
        "AWS/GCP/Azure Cloud Setup",
        "Docker Containerization",
        "Kubernetes Orchestration",
        "CI/CD Pipeline Implementation",
        "Infrastructure as Code (Terraform)",
        "Monitoring & Logging Solutions"
      ],
      technologies: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
      price: "Starting at $1,800",
      timeline: "1-4 weeks"
    },
    {
      title: "API Development & Integration",
      icon: <Server className="h-8 w-8" />,
      description: "Robust API development and third-party service integrations for seamless connectivity.",
      features: [
        "RESTful API Development",
        "GraphQL Implementation",
        "Third-party API Integration",
        "Microservices Architecture",
        "API Documentation",
        "Rate Limiting & Security"
      ],
      technologies: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "JWT"],
      price: "Starting at $1,200",
      timeline: "1-3 weeks"
    },
    {
      title: "Database Design & Optimization",
      icon: <Database className="h-8 w-8" />,
      description: "Efficient database architecture and performance optimization for your applications.",
      features: [
        "Database Schema Design",
        "Query Optimization",
        "Data Migration Services",
        "Backup & Recovery Solutions",
        "Performance Monitoring",
        "Scaling Strategies"
      ],
      technologies: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"],
      price: "Starting at $800",
      timeline: "1-2 weeks"
    },
    {
      title: "Automation & Scripting",
      icon: <Bot className="h-8 w-8" />,
      description: "Custom automation solutions to streamline your business processes and workflows.",
      features: [
        "Process Automation",
        "Data Processing Scripts",
        "Web Scraping Solutions",
        "Report Generation",
        "System Integration",
        "Task Scheduling"
      ],
      technologies: ["Python", "PowerShell", "Bash", "Selenium", "BeautifulSoup"],
      price: "Starting at $600",
      timeline: "1-2 weeks"
    },
    {
      title: "Security & Penetration Testing",
      icon: <Shield className="h-8 w-8" />,
      description: "Comprehensive security assessment and vulnerability testing for your applications.",
      features: [
        "Vulnerability Assessment",
        "Penetration Testing",
        "Security Code Review",
        "Compliance Auditing",
        "Security Training",
        "Incident Response"
      ],
      technologies: ["Kali Linux", "Metasploit", "Burp Suite", "OWASP", "Nessus"],
      price: "Starting at $1,500",
      timeline: "1-3 weeks"
    }
  ]

  const techStack = [
    { category: "Frontend", techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", techs: ["Node.js", "Express.js", "Python", "FastAPI", "Java"] },
    { category: "Database", techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"] },
    { category: "Cloud", techs: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"] },
    { category: "DevOps", techs: ["GitHub Actions", "Jenkins", "Terraform", "NGINX", "GitLab"] },
    { category: "Tools", techs: ["Git", "VS Code", "Jupyter", "Postman", "Figma"] }
  ]

  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "50+ Projects Delivered",
      description: "Successfully completed projects across various industries"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "25+ Happy Clients",
      description: "Maintained 100% client satisfaction rate"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "On-Time Delivery",
      description: "98% of projects delivered on or before deadline"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "5-Star Reviews",
      description: "Consistently rated 5 stars by clients"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechStart Inc.",
      content: "Kovendhan delivered exceptional work on our web application. His attention to detail and technical expertise exceeded our expectations.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder, DataFlow Solutions",
      content: "Outstanding cloud infrastructure setup. The deployment process is now seamless and our application scales perfectly.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, InnovateCorp",
      content: "Professional, reliable, and skilled. Kovendhan transformed our legacy system into a modern, efficient application.",
      rating: 5
    }
  ]

  const workProcess = [
    {
      step: "1",
      title: "Discovery & Planning",
      description: "Understanding your requirements, goals, and technical constraints"
    },
    {
      step: "2",
      title: "Design & Architecture",
      description: "Creating detailed technical specifications and system design"
    },
    {
      step: "3",
      title: "Development & Testing",
      description: "Agile development with continuous testing and quality assurance"
    },
    {
      step: "4",
      title: "Deployment & Support",
      description: "Production deployment with ongoing support and maintenance"
    }
  ]

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-background relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />

      {/* Home Button */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", damping: 20 }}
      >
        <Link href="/">
          <motion.div
            className="group relative p-3 bg-background/80 backdrop-blur-md border border-primary/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "hsl(var(--primary))",
              borderColor: "hsl(var(--primary))"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 -z-10"
              initial={false}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </Link>
      </motion.div>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden min-h-screen flex items-center">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
          style={{ y: backgroundY, scale: backgroundScale }}
        />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 20 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <Badge variant="outline" className="text-lg px-4 py-2 border-primary/30 bg-primary/5">
                Available for Freelance Projects
              </Badge>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x">
                Professional Freelance
              </span>
              <br />
              <motion.span 
                className="text-foreground relative inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                    "0 0 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Development Services
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-lg -z-10"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Full-stack developer specializing in modern web applications, cloud infrastructure,
              and DevOps solutions. Let's bring your ideas to life with cutting-edge technology.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your Project
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Download className="mr-2 h-5 w-5" />
                  Download Portfolio
                </Button>
              </motion.div>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              className="flex flex-wrap gap-8 justify-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                { label: "Projects Completed", value: "50+" },
                { label: "Happy Clients", value: "25+" },
                { label: "Success Rate", value: "98%" },
                { label: "Response Time", value: "<2h" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <motion.div
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">My Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive development services tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">What's Included:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-lg text-primary">{service.price}</p>
                          <p className="text-sm text-muted-foreground">{service.timeline}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Get Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern technologies and tools I use to build exceptional solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.techs.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Track Record</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proven results and client satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How I Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A structured approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full text-white text-xl font-bold mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
                {index < workProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your requirements and create something amazing together.
              I'm available for both short-term projects and long-term partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <MessageSquare className="mr-2 h-5 w-5" />
                Schedule a Call
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                kovendhan.dev@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Available for consultation
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
