'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { services, testimonials } from '@/data/freelance';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Bot,
    Building,
    CheckCircle,
    Clock,
    Code,
    Database,
    Globe,
    Home,
    Mail, MessageSquare,
    Rocket,
    Send,
    Server,
    Shield,
    Star, Target,
    Timer,
    TrendingUp,
    User,
    Users,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { memo, useCallback, useEffect, useState } from 'react';

// Helper function to get service icons
const getServiceIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6 text-white" };
  switch (iconName) {
    case 'Globe': return <Globe {...iconProps} />;
    case 'Code': return <Code {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Shield': return <Shield {...iconProps} />;
    case 'Cloud': return <TrendingUp {...iconProps} />;
    case 'Bot': return <Bot {...iconProps} />;
    case 'Target': return <Target {...iconProps} />;
    case 'TrendingUp': return <TrendingUp {...iconProps} />;
    default: return <Rocket {...iconProps} />;
  }
};

// Service packages data - Conversion optimized
const servicePacks = [
  {
    name: 'Starter',
    price: '$799',
    originalPrice: '$1,200',
    duration: '5-7 days',
    icon: <Code className="w-8 h-8" />,
    gradient: 'from-green-500 to-blue-600',
    glowColor: 'shadow-green-500/50',
    features: [
      '🚀 Professional Landing Page',
      '📱 Mobile-First Responsive Design',
      '🔍 SEO Optimization (Rank Higher)',
      '📧 Contact Form + Lead Capture',
      '⚡ Lightning Fast Loading',
      '🔒 SSL Security Included',
      '💯 100% Money-Back Guarantee',
      '📞 Priority Support (48h)'
    ],
    popular: false,
    description: 'Perfect for small businesses ready to dominate their local market online.',
    urgency: '⏰ 3 spots left this month',
    cta: 'Launch in 1 Week!'
  },
  {
    name: 'Growth',
    price: '$1,497',
    originalPrice: '$2,500',
    duration: '7-10 days',
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: 'from-blue-500 to-purple-600',
    glowColor: 'shadow-blue-500/50',
    features: [
      '🌐 Complete Multi-Page Website',
      '🛒 E-commerce Ready (Sell Online)',
      '📊 Advanced Analytics Dashboard',
      '🤖 Marketing Automation Setup',
      '🎨 Custom Branding & Design',
      '📈 Conversion Optimization',
      '🔄 Unlimited Revisions',
      '📱 Progressive Web App (PWA)',
      '☁️ Cloud Hosting Setup',
      '🎯 Lead Generation Tools'
    ],
    popular: true,
    description: 'Complete business solution for serious entrepreneurs ready to scale.',
    urgency: '🔥 Most Popular - Only 2 spots available',
    cta: 'Scale Your Business!'
  },
  {
    name: 'Enterprise',
    price: '$2,997',
    originalPrice: '$5,000',
    duration: '10-14 days',
    icon: <Building className="w-8 h-8" />,
    gradient: 'from-purple-500 to-pink-600',
    glowColor: 'shadow-purple-500/50',
    features: [
      '🏢 Enterprise Web Application',
      '🔐 Advanced User Management',
      '💳 Payment Processing System',
      '📊 Custom Dashboard & Reports',
      '🔗 API Development & Integration',
      '☁️ Scalable Cloud Infrastructure',
      '🛡️ Enterprise Security',
      '📱 Native Mobile App (iOS/Android)',
      '🤝 Dedicated Account Manager',
      '⚡ Priority Development Lane',
      '🔧 6 Months Maintenance Included',
      '📞 24/7 Priority Support'
    ],
    popular: false,
    description: 'Enterprise-grade solution for companies serious about digital transformation.',
    urgency: '💎 Exclusive - 1 slot per month',
    cta: 'Transform Your Business!'
  }
];

const FreelancePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter services
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const categories = [
    { value: 'all', label: '🎯 All Services', count: services.length },
    { value: 'development', label: '💻 Development', count: services.filter(s => s.category === 'development').length },
    { value: 'devops', label: '☁️ DevOps', count: services.filter(s => s.category === 'devops').length },
    { value: 'automation', label: '🤖 Automation', count: services.filter(s => s.category === 'automation').length },
    { value: 'security', label: '🛡️ Security', count: services.filter(s => s.category === 'security').length },
    { value: 'consulting', label: '💡 Consulting', count: services.filter(s => s.category === 'consulting').length },
  ];

  // Optimized animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (!formData.service) errors.service = 'Please select a service';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - you can replace this with actual form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        service: '',
        budget: '',
        timeline: ''
      });
      
      alert('🎉 Thank you! I\'ll get back to you within 24 hours with a detailed proposal.');
    } catch (error) {
      alert('❌ Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Optimized Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-blue-950/30 to-purple-950/30" />
        {/* Simplified background pattern - fewer elements for better performance */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Home Button */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/80 border-gray-600/50 text-gray-300 hover:bg-gray-800/90 hover:border-gray-500 hover:text-white backdrop-blur-md transition-all duration-200"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </motion.div>

      <div className="relative z-10">
        {/* Hero Section - Conversion Optimized */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-6xl mx-auto"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Badge variant="outline" className="mb-4 px-6 py-2 text-sm bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/40 text-green-400">
                <Timer className="w-4 h-4 mr-2" />
                ⚡ Limited Slots Available - Book Now!
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500"
            >
              Turn Your Vision Into
              <br />
              <span className="text-white">Revenue Reality</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              <strong className="text-white">ROI-focused development</strong> that transforms your business ideas into profitable, 
              high-performance web solutions. Get your project delivered on time, on budget, with guaranteed results.
            </motion.p>

            {/* Value Props */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            >
              {[
                { icon: <Clock className="w-6 h-6" />, title: "Fast Delivery", desc: "2-6 weeks max" },
                { icon: <Shield className="w-6 h-6" />, title: "100% Guarantee", desc: "Money-back promise" },
                { icon: <Users className="w-6 h-6" />, title: "50+ Happy Clients", desc: "98% satisfaction rate" }
              ].map((prop, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-lg backdrop-blur-sm">
                  <div className="text-blue-400">{prop.icon}</div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{prop.title}</div>
                    <div className="text-sm text-gray-400">{prop.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-10 py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-green-500/25 transition-all duration-200 animate-pulse"
              >
                🚀 Get Free Quote (24h Response)
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              
              <Link href="/projects">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-5 rounded-full text-lg font-semibold"
                >
                  See Success Stories
                  <Star className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
            >
              {[
                { number: "50+", label: "Projects Delivered", icon: <Rocket className="w-6 h-6" /> },
                { number: "98%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
                { number: "24h", label: "Response Time", icon: <Clock className="w-6 h-6" /> },
                { number: "$2M+", label: "Client Revenue Generated", icon: <TrendingUp className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-900/30 rounded-lg backdrop-blur-sm">
                  <div className="flex justify-center mb-2 text-blue-400">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-2 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Service Packages - Conversion Optimized */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Fixed-Price
                </span>{" "}
                Packages
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                No hidden fees, no surprises. Choose your package and get started immediately.
              </motion.p>
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold">
                <Timer className="w-4 h-4" />
                Limited Time: Save up to 40% - Ends This Month!
              </motion.div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {servicePacks.map((pack, index) => (
                <motion.div
                  key={pack.name}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`relative group ${pack.popular ? 'order-first md:order-none' : ''}`}
                >
                  {pack.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 text-sm font-bold animate-pulse">
                        🔥 BEST VALUE
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`h-full bg-gray-900/80 border-gray-700/50 backdrop-blur-sm transition-all duration-200 group-hover:border-green-500/50 group-hover:shadow-2xl ${pack.glowColor} ${pack.popular ? 'border-green-500/50 shadow-lg shadow-green-500/20 scale-105' : ''}`}>
                    <CardHeader className="text-center pb-6">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${pack.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        {pack.icon}
                      </div>
                      <CardTitle className="text-2xl text-white mb-2">{pack.name}</CardTitle>
                      
                      {/* Pricing with discount */}
                      <div className="mb-2">
                        <div className="text-gray-400 line-through text-lg">{pack.originalPrice}</div>
                        <div className="text-4xl font-bold text-green-400">{pack.price}</div>
                        <div className="text-sm text-green-400 font-semibold">
                          Save {Math.round((1 - parseInt(pack.price.replace('$', '').replace(',', '')) / parseInt(pack.originalPrice.replace('$', '').replace(',', ''))) * 100)}%
                        </div>
                      </div>
                      
                      <div className="text-blue-400 font-semibold mb-2">⚡ {pack.duration}</div>
                      <div className="text-sm text-orange-400 font-semibold mb-4">{pack.urgency}</div>
                      <CardDescription className="text-gray-300 text-sm">
                        {pack.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                        {pack.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-gray-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => {
                          setFormData(prev => ({...prev, service: pack.name, budget: pack.price}));
                          scrollToForm();
                        }}
                        className={`w-full py-4 text-lg font-bold ${
                          pack.popular 
                            ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 animate-pulse' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                        }`}
                      >
                        {pack.cta}
                        <Rocket className="ml-2 w-5 h-5" />
                      </Button>
                      <div className="text-center text-xs text-gray-400 mt-2">
                        💯 Money-back guarantee • No hidden fees
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Social Proof */}
            <motion.div 
              className="text-center mt-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-center items-center gap-8 flex-wrap text-gray-400">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold">50+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">24h Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">100% Money Back</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials - Optimized */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
                Real Results from <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Real Clients</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Join 50+ successful businesses that chose to work with me
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-yellow-400 font-semibold">4.9/5 Average Rating</span>
              </motion.div>
            </motion.div>

            {/* Featured Testimonials */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <Card className="h-full bg-gray-900/60 border-gray-700/50 backdrop-blur-sm transition-all duration-200 group-hover:border-blue-500/50 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                          />
                        ))}
                        <Badge variant="outline" className="ml-auto text-xs border-green-500/50 text-green-400">
                          ✅ Verified
                        </Badge>
                      </div>
                      
                      <blockquote className="text-gray-300 mb-4 text-sm leading-relaxed">
                        "{testimonial.content.substring(0, 200)}..."
                      </blockquote>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                          <div className="text-xs text-gray-400">{testimonial.role} • {testimonial.company}</div>
                        </div>
                        <div className="text-xs text-blue-400 font-semibold">{testimonial.projectType}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA after testimonials */}
            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Them?</h3>
                <p className="text-gray-300 mb-6">Get your free consultation and project quote within 24 hours</p>
                <Button 
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold"
                >
                  🚀 Get My Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form - Conversion Optimized */}
        <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-950/30 to-purple-950/30">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
                Get Your Free <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Quote in 24h</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
                Tell me about your project and I'll send you a detailed proposal with timeline and pricing.
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>24h response</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No obligation</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Simplified form - only essential fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`pl-10 bg-gray-800/60 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 ${formErrors.name ? 'border-red-500' : ''}`}
                            placeholder="John Smith"
                          />
                        </div>
                        {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`pl-10 bg-gray-800/60 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 ${formErrors.email ? 'border-red-500' : ''}`}
                            placeholder="john@company.com"
                          />
                        </div>
                        {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                          What do you need? *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className={`w-full bg-gray-800/60 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20 rounded-md px-3 py-3 ${formErrors.service ? 'border-red-500' : ''}`}
                        >
                          <option value="">Choose your project type</option>
                          <option value="Starter Package">🚀 Starter Package ($799)</option>
                          <option value="Growth Package">📈 Growth Package ($1,497)</option>
                          <option value="Enterprise Package">🏢 Enterprise Package ($2,997)</option>
                          <option value="Custom Website">🌐 Custom Website</option>
                          <option value="E-commerce Store">🛒 E-commerce Store</option>
                          <option value="Web Application">⚡ Web Application</option>
                          <option value="Mobile App">📱 Mobile App</option>
                          <option value="Not Sure">🤔 Not sure yet</option>
                        </select>
                        {formErrors.service && <p className="text-red-400 text-sm mt-1">{formErrors.service}</p>}
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/60 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20 rounded-md px-3 py-3"
                        >
                          <option value="">Select your budget</option>
                          <option value="$500-$1000">💰 $500 - $1,000</option>
                          <option value="$1000-$2500">💎 $1,000 - $2,500</option>
                          <option value="$2500-$5000">🚀 $2,500 - $5,000</option>
                          <option value="$5000+">🏆 $5,000+</option>
                          <option value="Not Sure">🤷 Not sure yet</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Tell me about your project *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className={`pl-10 pt-10 bg-gray-800/60 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 ${formErrors.message ? 'border-red-500' : ''}`}
                          placeholder="Describe your project, goals, and any specific requirements. The more details you provide, the better I can help you!"
                        />
                      </div>
                      {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                        When do you need this completed?
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/60 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20 rounded-md px-3 py-3"
                      >
                        <option value="">Select timeline</option>
                        <option value="ASAP">🔥 ASAP (Rush job - 50% extra)</option>
                        <option value="1-2 weeks">⚡ 1-2 weeks</option>
                        <option value="2-4 weeks">📅 2-4 weeks (Recommended)</option>
                        <option value="1-2 months">📆 1-2 months</option>
                        <option value="Flexible">🤝 Flexible timeline</option>
                      </select>
                    </div>

                    <div className="pt-6 border-t border-gray-700/50">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 text-lg font-bold rounded-xl transition-all duration-200 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            🚀 Get My Free Quote (24h Response)
                            <Send className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                      <p className="text-center text-sm text-gray-400 mt-4">
                        💯 100% free consultation • No spam, ever • Usually respond within 2-4 hours
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust indicators below form */}
            <motion.div 
              className="mt-12 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-center items-center gap-8 flex-wrap text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>24h Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>50+ Happy Clients</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Me</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto">
                The difference is in the details and the results I deliver
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "ROI-Focused",
                  description: "Every project designed to maximize your return on investment and business growth"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Lightning Fast",
                  description: "Quick delivery without compromising quality - most projects completed in 1-2 weeks"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Risk-Free",
                  description: "100% money-back guarantee if you're not completely satisfied with the results"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Future-Proof",
                  description: "Scalable solutions that grow with your business and adapt to changing needs"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                    <div className="text-white">{benefit.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={scrollToForm}
          size="lg"
          className="rounded-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-xl hover:shadow-green-500/25 w-16 h-16 p-0 animate-bounce"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default memo(FreelancePage);
