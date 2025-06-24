'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Globe, Home, Palette, Rocket, Sparkles, Star, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FreelancePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const servicePacks = [
    {
      name: 'Basic',
      price: '$500',
      duration: '1-2 weeks',
      icon: <Code className="w-8 h-8" />,
      gradient: 'from-blue-500 to-purple-600',
      glowColor: 'shadow-blue-500/50',
      features: [
        'Responsive Landing Page',
        'Basic SEO Setup',
        'Contact Form Integration',
        'Mobile Optimization',
        '1 Round of Revisions',
        '30 Days Support'
      ],
      popular: false,
      description: 'Perfect for small businesses and personal brands looking to establish their online presence.'
    },
    {
      name: 'Standard',
      price: '$1,200',
      duration: '2-3 weeks',
      icon: <Palette className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-600',
      glowColor: 'shadow-purple-500/50',
      features: [
        'Multi-page Website (up to 5 pages)',
        'Advanced SEO & Analytics',
        'Content Management System',
        'E-commerce Integration',
        'Custom Animations',
        '3 Rounds of Revisions',
        '60 Days Support',
        'Performance Optimization'
      ],
      popular: true,
      description: 'Ideal for growing businesses that need a comprehensive web solution with advanced features.'
    },
    {
      name: 'Premium',
      price: '$2,500',
      duration: '3-4 weeks',
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-pink-500 to-orange-600',
      glowColor: 'shadow-pink-500/50',
      features: [
        'Complex Web Application',
        'Database Integration',
        'User Authentication',
        'API Development',
        'Advanced Animations & 3D',
        'Cloud Deployment',
        'Unlimited Revisions',
        '90 Days Support',
        'Maintenance Package',
        'Priority Support'
      ],
      popular: false,
      description: 'Enterprise-level solution for businesses requiring sophisticated web applications and systems.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      testimonial: 'Exceptional work! The website exceeded our expectations and boosted our conversion rate by 300%.',
      rating: 5,
      avatar: '/placeholder-user.jpg'
    },
    {
      name: 'Michael Chen',
      company: 'Digital Solutions',
      testimonial: 'Professional, fast, and incredibly talented. Our new platform is exactly what we envisioned.',
      rating: 5,
      avatar: '/placeholder-user.jpg'
    },
    {
      name: 'Emily Rodriguez',
      company: 'Creative Agency',
      testimonial: 'The attention to detail and innovative design approach made all the difference for our brand.',
      rating: 5,
      avatar: '/placeholder-user.jpg'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse star-${i}`}
            />
          ))}
        </div>
      </div>

      {/* Mouse Follower - CSS-only version */}
      <div className="mouse-follower fixed w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-60" />

      {/* Home Button */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-black/50 border-purple-500/50 text-white hover:bg-purple-500/20 backdrop-blur-md transition-all duration-300"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Freelance Services
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animated-gradient"
          >
            Transform Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent glitch-effect">
              Digital Vision
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Bring your ideas to life with cutting-edge web development, stunning design, 
            and powerful functionality that drives results.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/50 text-white hover:bg-purple-500/20 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              View Portfolio
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Service Packages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tailored solutions for every business size and requirement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicePacks.map((pack, index) => (
              <motion.div
                key={pack.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative group"
              >
                <Card className={`
                  bg-gradient-to-b from-gray-900/50 to-black/50 border-gray-700 backdrop-blur-md
                  transition-all duration-500 group-hover:${pack.glowColor} group-hover:shadow-2xl
                  ${pack.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}
                  relative overflow-hidden h-full
                `}>
                  {pack.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pack.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {pack.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">{pack.name}</CardTitle>
                    <div className="text-4xl font-bold text-white mb-2">{pack.price}</div>
                    <div className="text-gray-400 mb-4">{pack.duration}</div>
                    <CardDescription className="text-gray-300 text-sm leading-relaxed">
                      {pack.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {pack.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`
                        w-full mt-6 bg-gradient-to-r ${pack.gradient} 
                        hover:shadow-lg hover:shadow-purple-500/25 
                        text-white font-semibold py-3 transition-all duration-300
                        group-hover:scale-105
                      `}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it - hear from satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="bg-gradient-to-b from-gray-900/50 to-black/50 border-gray-700 backdrop-blur-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25 h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic leading-relaxed">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Showcase Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Portfolio Showcase
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore some of our most impressive projects and see what we can create for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "E-commerce Platform",
                description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
                image: "/images/projects/Screenshot 2025-05-30 204300.png",
                technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
                category: "Web Development",
                gradient: "from-blue-500 to-purple-600"
              },
              {
                title: "AI-Powered Analytics",
                description: "Machine learning dashboard with real-time data visualization and predictive analytics.",
                image: "/images/projects/Screenshot 2025-05-30 204400.png",
                technologies: ["Python", "TensorFlow", "React", "D3.js"],
                category: "AI/ML",
                gradient: "from-green-500 to-blue-600"
              },
              {
                title: "Cloud Infrastructure",
                description: "Scalable microservices architecture deployed on GCP with automated CI/CD pipelines.",
                image: "/images/projects/Screenshot 2025-05-30 204459.png",
                technologies: ["Docker", "Kubernetes", "GCP", "Terraform"],
                category: "DevOps",
                gradient: "from-orange-500 to-red-600"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Card className="portfolio-card card-lift bg-gradient-to-b from-gray-900/50 to-black/50 border-gray-700 backdrop-blur-md transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/25 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={`floating-badge bg-gradient-to-r ${project.gradient} text-white px-3 py-1 text-xs`}>
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          variant="outline" 
                          className="tech-badge border-purple-500/30 text-purple-300 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20 transition-all duration-300"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Development Process Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A proven methodology that ensures quality, efficiency, and client satisfaction at every step
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Planning",
                  description: "We dive deep into your requirements, target audience, and business goals to create a comprehensive project roadmap.",
                  icon: <Target className="w-8 h-8" />,
                  gradient: "from-blue-500 to-cyan-500",
                  duration: "1-2 days"
                },
                {
                  step: "02", 
                  title: "Design & Prototyping",
                  description: "Creating wireframes, mockups, and interactive prototypes to visualize your project before development begins.",
                  icon: <Palette className="w-8 h-8" />,
                  gradient: "from-purple-500 to-pink-500",
                  duration: "3-5 days"
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  description: "Agile development with regular updates, comprehensive testing, and quality assurance to ensure perfection.",
                  icon: <Code className="w-8 h-8" />,
                  gradient: "from-green-500 to-teal-500",
                  duration: "1-3 weeks"
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "Seamless deployment, performance optimization, and ongoing support to ensure your project's continued success.",
                  icon: <Rocket className="w-8 h-8" />,
                  gradient: "from-orange-500 to-red-500",
                  duration: "Ongoing"
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative reveal-up"
                >
                  <Card className="process-card card-lift bg-gradient-to-b from-gray-900/50 to-black/50 border-gray-700 backdrop-blur-md transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/25 h-full relative overflow-hidden">
                    {/* Step Number Background */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 leading-none">
                      {process.step}
                    </div>
                    
                    <CardContent className="p-6 relative z-10">
                      <div className={`process-step-icon w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${process.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {process.icon}
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className={`text-sm font-bold bg-gradient-to-r ${process.gradient} bg-clip-text text-transparent mb-2`}>
                          STEP {process.step}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors glitch-effect">
                          {process.title}
                        </h3>
                        <div className="text-xs text-gray-400 mb-3 font-medium">
                          {process.duration}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        {process.description}
                      </p>
                    </CardContent>
                    
                    {/* Connecting Line for Desktop */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent z-20 process-connecting-line"></div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Process Timeline for Mobile */}
            <div className="lg:hidden mt-8 relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Ready to Launch Your Vision?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join hundreds of satisfied clients who've transformed their businesses with our expertise.
              Your success story starts with a single click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/25"
              >
                <Zap className="w-6 h-6 mr-3" />
                Start Your Project Now
              </Button>
              <div className="text-gray-400 text-sm">
                Free consultation • No commitment required
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 floating-element-${i}`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FreelancePage;
