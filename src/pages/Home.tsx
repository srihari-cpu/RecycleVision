import { Recycle, Upload, Leaf, Globe, Zap, Brain, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MotionWrapper, MotionCard, MotionButton } from "@/components/MotionWrapper";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Classification",
      description: "Get instant results with our lightning-fast AI recognition",
      color: "text-amber-500",
      gradient: "from-amber-100 to-yellow-50"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Contributing to a sustainable future with every scan",
      color: "text-leaf",
      gradient: "from-leaf/10 to-forest/5"
    },
    {
      icon: Brain,
      title: "Smart AI",
      description: "Advanced machine learning for accurate waste identification",
      color: "text-ocean",
      gradient: "from-ocean/10 to-sky/20"
    },
    {
      icon: Smartphone,
      title: "Easy to Use",
      description: "Simple interface designed for everyone to use effortlessly",
      color: "text-forest",
      gradient: "from-forest/10 to-leaf/5"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Modern gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky/30 via-background to-earth/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--forest)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--ocean)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--leaf)/0.05),transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center">
          <MotionWrapper delay={0.2}>
            <motion.div 
              className="flex justify-center mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-forest to-ocean shadow-2xl animate-glass-float">
                <Recycle className="w-14 h-14 text-white" />
              </div>
            </motion.div>
          </MotionWrapper>
          
          <MotionWrapper delay={0.4}>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-forest via-ocean to-leaf bg-clip-text text-transparent bg-[length:200%_100%]"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              RecycleVision
            </motion.h1>
          </MotionWrapper>
          
          <MotionWrapper delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered recycling assistant that helps you make smarter waste management decisions instantly
            </p>
          </MotionWrapper>
          
          <MotionWrapper delay={0.8}>
            <Link to="/upload">
              <MotionButton>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-forest to-ocean hover:from-forest/90 hover:to-ocean/90 text-white px-12 py-8 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Upload className="w-6 h-6 mr-3" />
                  Try It Now →
                </Button>
              </MotionButton>
            </Link>
          </MotionWrapper>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <MotionWrapper delay={1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-forest">
              Why Choose RecycleVision?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge technology makes recycling simple, accurate, and accessible for everyone
            </p>
          </div>
        </MotionWrapper>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <MotionCard key={feature.title} delay={1.2 + index * 0.1}>
              <Card className="group h-full relative overflow-hidden border-0 bg-background/60 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50`} />
                <CardContent className="relative p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      className="flex items-center justify-center w-16 h-16 rounded-2xl bg-background/80 backdrop-blur-sm shadow-lg group-hover:shadow-xl"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-forest transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <MotionCard delay={1.6}>
          <Card className="relative overflow-hidden p-12 text-center bg-background/60 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-ocean/5" />
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-forest to-ocean bg-clip-text text-transparent">
                Ready to Make a Difference?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users already making smarter recycling decisions and helping build a more sustainable future
              </p>
              <Link to="/upload">
                <MotionButton>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 px-10 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Start Recycling Smarter
                  </Button>
                </MotionButton>
              </Link>
            </div>
          </Card>
        </MotionCard>
      </section>

      {/* Footer Quote */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <MotionWrapper delay={1.8}>
          <div className="text-center">
            <p className="text-muted-foreground italic text-lg">
              "The best time to plant a tree was 20 years ago. The second best time is now." 
              <span className="block mt-2 text-forest font-medium">- Start your sustainable journey today</span>
            </p>
          </div>
        </MotionWrapper>
      </section>
    </div>
  );
};

export default Home;