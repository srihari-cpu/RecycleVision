import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MotionWrapper, MotionCard } from "@/components/MotionWrapper";
import {
  Package,
  Newspaper,
  Wrench,
  Wine,
  Download,
  Upload,
  Recycle,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClassification } from "@/contexts/ClassificationContext";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

// Add this constant near the top with other constants
const RECYCLABLE_MATERIALS = {
  styrofoam: {
    isRecyclable: false,
    message: "✗ Styrofoam is generally not recyclable",
    tips: "Consider alternatives like paper or recyclable plastic containers. Dispose of styrofoam in regular trash.",
  },
  plastic: {
    isRecyclable: true,
    message: "✓ Most plastics are recyclable",
    tips: "Check the recycling number on the bottom of plastic items",
  },
  glass: {
    isRecyclable: true,
    message: "✓ Glass is recyclable and can be recycled endlessly",
    tips: "Rinse containers and remove caps/lids",
  },
  paper: {
    isRecyclable: true,
    message: "✓ Paper is recyclable",
    tips: "Keep paper clean and dry. Remove any plastic coating",
  },
  metal: {
    isRecyclable: true,
    message: "✓ Metal is highly recyclable",
    tips: "Clean and crush metal cans to save space",
  },
};

// Placeholder data - will be replaced with real ML predictions
const mockResult = {
  image: "/placeholder.svg",
  category: "Plastic",
  confidence: 92,
  probabilities: {
    plastic: 92,
    glass: 5,
    paper: 2,
    metal: 1,
  },
};

const categoryIcons = {
  Plastic: Package,
  Glass: Wine,
  Paper: Newspaper,
  Metal: Wrench,
  Styrofoam: Package, // or another appropriate icon
};

const categoryColors = {
  Plastic: "bg-ocean text-white",
  Glass: "bg-forest text-white",
  Paper: "bg-leaf text-white",
  Metal: "bg-muted text-muted-foreground",
  Styrofoam: "bg-red-500 text-white",
};

const Result = () => {
  const navigate = useNavigate();
  const { result, imageUrl } = useClassification();
  const { toast } = useToast();

  // Use real data if available, otherwise use mock data
  const displayResult = result || mockResult;
  const displayImage = imageUrl || "/placeholder.svg";

  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const [animatedProbs, setAnimatedProbs] = useState({
    plastic: 0,
    glass: 0,
    paper: 0,
    metal: 0,
  });

  useEffect(() => {
    // Convert confidence to percentage if it's a decimal
    const confidence =
      displayResult.confidence > 1
        ? displayResult.confidence
        : displayResult.confidence * 100;

    // Animate confidence score
    const timer1 = setTimeout(() => {
      setAnimatedConfidence(confidence);
    }, 500);

    // Animate probability bars - handle different data structures
    const timer2 = setTimeout(() => {
      if (displayResult.probabilities) {
        // Convert probabilities to percentages and normalize keys
        const normalizedProbs = Object.fromEntries(
          Object.entries(displayResult.probabilities).map(([key, value]) => [
            key.toLowerCase(),
            typeof value === "number" ? (value > 1 ? value : value * 100) : 0,
          ])
        );
        setAnimatedProbs({ ...animatedProbs, ...normalizedProbs });
      } else {
        setAnimatedProbs(mockResult.probabilities);
      }
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [displayResult]);

  const CategoryIcon =
    categoryIcons[displayResult.category as keyof typeof categoryIcons] ||
    Recycle;

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("Waste Classification Report", 20, 30);

    // Date
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 45);

    // Classification Results
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Classification Results", 20, 65);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Category: ${displayResult.category}`, 30, 80);
    pdf.text(
      `Confidence: ${
        displayResult.confidence > 1
          ? displayResult.confidence.toFixed(2)
          : (displayResult.confidence * 100).toFixed(2)
      }%`,
      30,
      95
    );

    // --- ♻️ Recyclability Section ---
    const status = getRecyclabilityStatus(displayResult.category);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Recyclability Status", 20, 115);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    // Instead of ✓/✗, use plain text for reliability
    const statusLabel = status.isRecyclable
      ? "Recyclable Material"
      : "Not Recyclable Material";

    // Use color coding (green or orange)
    pdf.setTextColor(
      status.isRecyclable ? 0 : 204,
      status.isRecyclable ? 128 : 102,
      status.isRecyclable ? 0 : 0
    );
    pdf.text(`Status: ${statusLabel}`, 30, 130);

    pdf.setTextColor(0, 0, 0);
    pdf.text(
      `Details: ${status.message.replace("✓", "").replace("✗", "")}`,
      30,
      145
    );

    pdf.setFont("helvetica", "italic");
    pdf.text(`Tip: ${status.tips}`, 30, 160);
    pdf.setFont("helvetica", "normal");

    // --- 📊 Probability Details ---
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Detailed Analysis", 20, 180);

    let yPos = 195;
    const probabilities =
      displayResult.probabilities || mockResult.probabilities;
    Object.entries(probabilities).forEach(([material, probability]) => {
      const value =
        typeof probability === "number"
          ? probability > 1
            ? probability
            : probability * 100
          : 0;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(
        `${
          material.charAt(0).toUpperCase() + material.slice(1)
        }: ${value.toFixed(2)}%`,
        30,
        yPos
      );
      yPos += 15;
    });

    // Save the PDF
    pdf.save("waste-classification-report.pdf");

    toast({
      title: "Report Downloaded",
      description: "Your classification report has been saved as PDF.",
    });
  };

  // Replace the getRecyclabilityStatus function with this:
  const getRecyclabilityStatus = (category: string) => {
    const materialType = category.toLowerCase();
    const materialInfo =
      RECYCLABLE_MATERIALS[materialType as keyof typeof RECYCLABLE_MATERIALS];

    return {
      isRecyclable: materialInfo?.isRecyclable ?? false,
      message: materialInfo?.message ?? "? Unable to determine recyclability",
      tips:
        materialInfo?.tips ?? "Please consult your local recycling guidelines",
      color: materialInfo?.isRecyclable
        ? "text-green-600 dark:text-green-400"
        : "text-amber-600 dark:text-amber-400",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest/20 via-ocean/20 to-leaf/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <MotionWrapper className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Classification Result
          </h1>
          <p className="text-muted-foreground">
            AI-powered waste analysis complete
          </p>
        </MotionWrapper>

        {/* Main Result Card */}
        <MotionCard delay={0.2} className="mb-8">
          <Card className="glass-card border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Image Preview */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  <img
                    src={displayImage}
                    alt="Uploaded waste item"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="glass-card">
                      <Recycle className="w-4 h-4 mr-1" />
                      Analyzed
                    </Badge>
                  </div>
                </motion.div>

                {/* Results */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-6"
                >
                  {/* Category Badge */}
                  <div className="text-center">
                    <Badge
                      variant="default"
                      className={`${
                        categoryColors[
                          displayResult.category as keyof typeof categoryColors
                        ] || "bg-forest text-white"
                      } text-white text-lg px-4 py-2 mb-4`}
                    >
                      <CategoryIcon className="w-5 h-5 mr-2" />
                      {displayResult.category}
                    </Badge>
                  </div>

                  {/* Confidence Ring */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <svg
                        className="w-32 h-32 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        {/* Background circle */}
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-muted/20"
                        />
                        {/* Progress circle */}
                        <motion.path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeDasharray={`${animatedConfidence}, 100`}
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{
                            strokeDasharray: `${animatedConfidence}, 100`,
                          }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="text-primary"
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="hsl(var(--forest))" />
                            <stop offset="100%" stopColor="hsl(var(--ocean))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-2xl font-bold text-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          {animatedConfidence.toFixed(2)}%
                        </motion.span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Confidence Level
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </MotionCard>

        {/* Probability Details Grid */}
        <MotionWrapper delay={0.4} className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Detailed Analysis
          </h2>
          {!result ? (
            <Card className="p-8 text-center">
              <CardContent>
                <Lightbulb className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  No classification yet
                </h3>
                <p className="text-muted-foreground">
                  Upload an image to see classification results.
                </p>
                <Button onClick={() => navigate("/upload")} className="mt-4">
                  Upload Image
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(
                displayResult.probabilities || mockResult.probabilities
              ).map(([material, probability], index) => {
                const icons = {
                  plastic: Package,
                  glass: Wine,
                  paper: Newspaper,
                  metal: Wrench,
                };
                const Icon = icons[material as keyof typeof icons] || Recycle;

                return (
                  <MotionCard key={material} delay={0.5 + index * 0.1}>
                    <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-sm font-medium">
                          <Icon className="w-4 h-4 mr-2 text-primary" />
                          {material.charAt(0).toUpperCase() + material.slice(1)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-foreground">
                              {Math.round(
                                animatedProbs[
                                  material.toLowerCase() as keyof typeof animatedProbs
                                ] ||
                                  (typeof probability === "number"
                                    ? probability > 1
                                      ? probability
                                      : probability * 100
                                    : 0)
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              animatedProbs[
                                material.toLowerCase() as keyof typeof animatedProbs
                              ] ||
                              (typeof probability === "number"
                                ? probability > 1
                                  ? probability
                                  : probability * 100
                                : 0)
                            }
                            className="h-2"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </MotionCard>
                );
              })}
            </div>
          )}
        </MotionWrapper>

        {/* Action Buttons */}
        <MotionWrapper
          delay={0.8}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="glass-card hover:glass-card-hover"
            onClick={generatePDF}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button
            onClick={() => navigate("/upload")}
            size="lg"
            className="bg-gradient-to-r from-forest to-ocean hover:from-forest/90 hover:to-ocean/90"
          >
            <Upload className="w-4 h-4 mr-2" />
            Try Another Image
          </Button>
        </MotionWrapper>

        {/* Recyclability Focus Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex justify-center"
        >
          <Card className="w-full max-w-lg border-0 shadow-xl glass-card text-center p-8">
            {(() => {
              const status = getRecyclabilityStatus(displayResult.category);
              return (
                <>
                  <div className="flex items-center justify-center mb-4">
                    {status.isRecyclable ? (
                      <Recycle className="w-10 h-10 text-green-600 dark:text-green-400 mr-3" />
                    ) : (
                      <Wrench className="w-10 h-10 text-amber-600 dark:text-amber-400 mr-3 rotate-45" />
                    )}
                    <h3
                      className={`text-2xl font-bold ${
                        status.isRecyclable
                          ? "text-green-600 dark:text-green-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {status.isRecyclable ? "Recyclable" : "Not Recyclable"}
                    </h3>
                  </div>

                  <p className="text-base font-medium mb-2 text-foreground">
                    {status.message}
                  </p>

                  <p className="text-sm text-muted-foreground italic">
                    💡 Tip: {status.tips}
                  </p>
                </>
              );
            })()}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
