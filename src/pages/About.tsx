import { Leaf, Target, Eye, Lightbulb, Heart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotionWrapper, MotionCard } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Leaf, value: "50K+", label: "Items Classified" },
    { icon: Heart, value: "25%", label: "Waste Reduction" },
  ];

  return (
    <div className="min-h-screen">
      {/* Modern gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-background to-earth/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,hsl(var(--forest)/0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,hsl(var(--ocean)/0.08),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 py-24 max-w-6xl">
        {/* Hero Section */}
        <MotionWrapper>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <motion.div 
                className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-forest to-ocean shadow-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-forest to-ocean bg-clip-text text-transparent">
              About RecycleVision
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transforming waste management through artificial intelligence and empowering individuals to make sustainable choices for our planet's future.
            </p>
          </div>
        </MotionWrapper>

        {/* Stats Section */}
        <MotionWrapper delay={0.3}>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <MotionCard key={stat.label} delay={0.4 + index * 0.1}>
                <Card className="text-center p-8 bg-background/60 backdrop-blur-xl border-0 shadow-xl rounded-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest/20 to-ocean/20 flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-forest" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-forest to-ocean bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </Card>
              </MotionCard>
            ))}
          </div>
        </MotionWrapper>

        {/* Content Tabs */}
        <MotionWrapper delay={0.6}>
          <Card className="bg-background/60 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-ocean/5" />
            <CardContent className="relative p-8 md:p-12">
              <Tabs defaultValue="mission" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-background/60 backdrop-blur-sm rounded-2xl p-2">
                  <TabsTrigger value="mission" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-forest data-[state=active]:to-ocean data-[state=active]:text-white">
                    <Target className="w-4 h-4 mr-2" />
                    Our Mission
                  </TabsTrigger>
                  <TabsTrigger value="how-it-works" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-forest data-[state=active]:to-ocean data-[state=active]:text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    How It Works
                  </TabsTrigger>
                  <TabsTrigger value="future-vision" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-forest data-[state=active]:to-ocean data-[state=active]:text-white">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Future Vision
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="mission" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-forest">Our Mission</h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        At RecycleVision, we believe that every small action towards sustainability can create a massive positive impact on our planet. Our mission is to democratize access to accurate recycling information through cutting-edge AI technology.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        We're committed to reducing confusion around waste sorting, increasing recycling rates, and fostering a culture of environmental responsibility. By making recycling guidance as simple as taking a photo, we're removing barriers and empowering everyone to participate in the circular economy.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Together, we're building a world where sustainability is accessible, intuitive, and rewarding for all.
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="how-it-works" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-ocean">How It Works</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forest to-ocean text-white flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <h4 className="font-semibold mb-2">Image Capture</h4>
                            <p className="text-muted-foreground">Take a photo of your waste item using your device's camera or upload an existing image.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forest to-ocean text-white flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <h4 className="font-semibold mb-2">AI Analysis</h4>
                            <p className="text-muted-foreground">Our advanced machine learning models analyze the image to identify the waste type and material composition.</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forest to-ocean text-white flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <h4 className="font-semibold mb-2">Smart Classification</h4>
                            <p className="text-muted-foreground">Get instant results with specific recycling instructions tailored to your local guidelines.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forest to-ocean text-white flex items-center justify-center text-sm font-bold">4</div>
                          <div>
                            <h4 className="font-semibold mb-2">Take Action</h4>
                            <p className="text-muted-foreground">Follow the personalized recycling guidance to properly dispose of your waste item.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="future-vision" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-leaf">Future Vision</h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        We envision a future where RecycleVision becomes the global standard for waste identification and management. Our roadmap includes exciting developments that will revolutionize how we interact with waste.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-8">
                        <Card className="p-6 bg-gradient-to-br from-forest/10 to-forest/5 border-forest/20 rounded-2xl">
                          <h4 className="font-semibold mb-3 text-forest">Global Integration</h4>
                          <p className="text-muted-foreground text-sm">Partner with municipalities worldwide to provide localized recycling guidelines and waste management solutions.</p>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-ocean/10 to-ocean/5 border-ocean/20 rounded-2xl">
                          <h4 className="font-semibold mb-3 text-ocean">AR Integration</h4>
                          <p className="text-muted-foreground text-sm">Augmented reality features that overlay recycling information directly onto real-world objects through your camera.</p>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-leaf/10 to-leaf/5 border-leaf/20 rounded-2xl">
                          <h4 className="font-semibold mb-3 text-leaf">Community Platform</h4>
                          <p className="text-muted-foreground text-sm">Build a community where users can share recycling tips, track their environmental impact, and compete in sustainability challenges.</p>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-amber-100/50 to-amber-50/50 border-amber-200 rounded-2xl">
                          <h4 className="font-semibold mb-3 text-amber-700">Smart City Integration</h4>
                          <p className="text-muted-foreground text-sm">IoT integration with smart bins and waste collection systems for optimized city-wide waste management.</p>
                        </Card>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Our ultimate goal is to create a world where waste becomes a resource, confusion is eliminated, and sustainability is seamlessly integrated into daily life.
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default About;