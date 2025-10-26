import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import { MotionWrapper, MotionCard } from "@/components/MotionWrapper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "srihariyadav1343@gmail.com",
      subtitle: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Our Location",
      details: "Maisammaguda, Bhadurpalle, Hyderabad, Telangana 500100",
      subtitle: "Building a sustainable future"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9515821175",
      subtitle: "Mon-Fri, 9AM-6PM IST"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/srihari-cpu", label: "GitHub", color: "hover:text-blue-600" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/srihari1343/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Twitter, href: "https://x.com/srihari_c78032", label: "Twitter", color: "hover:text-blue-600" },
  ];

  return (
    <div className="min-h-screen">
      {/* Modern gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-background to-earth/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,hsl(var(--forest)/0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,hsl(var(--ocean)/0.08),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 py-24 max-w-6xl">
        {/* Hero Section */}
        <MotionWrapper>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <motion.div 
                className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-forest to-ocean shadow-2xl"
                animate={{ 
                  boxShadow: [
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    "0 25px 50px -12px rgba(34, 197, 94, 0.25)",
                    "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mail className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-forest to-ocean bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about RecycleVision? Want to suggest a feature? We'd love to hear from you and help make recycling even easier.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <MotionWrapper delay={0.2}>
              <Card className="bg-background/60 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-ocean/5" />
                <CardContent className="relative p-8 md:p-12">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-forest">Send us a message</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  <ContactForm />
                </CardContent>
              </Card>
            </MotionWrapper>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Information */}
            <MotionWrapper delay={0.4}>
              <Card className="bg-background/60 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-ocean/5" />
                <CardContent className="relative p-6">
                  <h3 className="text-xl font-bold mb-6 text-forest">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <MotionCard key={info.title} delay={0.5 + index * 0.1}>
                        <div className="flex items-start gap-4 group">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-forest/20 to-ocean/20 group-hover:from-forest/30 group-hover:to-ocean/30 transition-all duration-300">
                            <info.icon className="w-6 h-6 text-forest" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{info.title}</h4>
                            <p className="text-muted-foreground mb-1">{info.details}</p>
                            <p className="text-sm text-muted-foreground/80">{info.subtitle}</p>
                          </div>
                        </div>
                      </MotionCard>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>

            {/* Social Media */}
            <MotionWrapper delay={0.6}>
              <Card className="bg-background/60 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-ocean/5" />
                <CardContent className="relative p-6">
                  <h3 className="text-xl font-bold mb-6 text-ocean">Follow Us</h3>
                  <div className="flex flex-col gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={social.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start gap-3 h-12 rounded-xl hover:bg-background/80 transition-all duration-300 ${social.color}`}
                          asChild
                        >
                          <a href={social.href} target="_blank" rel="noopener noreferrer">
                            <social.icon className="w-5 h-5" />
                            <span>{social.label}</span>
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>

            {/* Quick Actions */}
            <MotionWrapper delay={0.8}>
              <Card className="bg-background/60 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-leaf/5 to-forest/5" />
                <CardContent className="relative p-6">
                  <h3 className="text-xl font-bold mb-4 text-leaf">Quick Links</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start rounded-xl hover:bg-background/80 hover:text-blue-600"
                      asChild
                    >
                      <a href="/upload">🚀 Try RecycleVision</a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start rounded-xl hover:bg-background/80 hover:text-blue-600"
                      asChild
                    >
                      <a href="/about">📖 Learn More</a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start rounded-xl hover:bg-background/80 hover:text-blue-600"
                    >
                      💡 Feature Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          </div>
        </div>

        {/* Bottom CTA */}
        <MotionWrapper delay={1}>
          <div className="mt-16 text-center">
            <Card className="inline-block p-6 bg-background/40 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <p className="text-muted-foreground">
                Questions about our technology? Check out our{" "}
                <a href="/about" className="text-forest hover:text-ocean transition-colors underline">
                  About page
                </a>{" "}
                or try{" "}
                <a href="/upload" className="text-ocean hover:text-forest transition-colors underline">
                  uploading an image
                </a>{" "}
                to see RecycleVision in action.
              </p>
            </Card>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default Contact;