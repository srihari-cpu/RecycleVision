import { Camera, Upload as UploadIcon, CheckCircle } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import FileUpload from "@/components/FileUpload";
import { Card, CardContent } from "@/components/ui/card";

const Upload = () => {
  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name);
    // Here you would handle the file upload and processing
  };

  return (
    <div className="min-h-screen">
      {/* Modern gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-background to-earth/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--forest)/0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--ocean)/0.08),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <MotionWrapper>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-forest to-ocean shadow-2xl animate-glass-float">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-forest to-ocean bg-clip-text text-transparent">
              Upload Image
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Take a photo or upload an image of your waste item to get instant AI-powered recycling guidance
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <Card className="relative overflow-hidden bg-background/60 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-ocean/5" />
            <CardContent className="relative p-8 md:p-12">
              <FileUpload onFileSelect={handleFileSelect} />
            </CardContent>
          </Card>
        </MotionWrapper>
        
        <MotionWrapper delay={0.6}>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-background/40 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest/20 to-forest/10 flex items-center justify-center">
                  <UploadIcon className="w-6 h-6 text-forest" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-forest">Upload</h3>
              <p className="text-sm text-muted-foreground">Drag & drop or click to select your waste image</p>
            </Card>
            
            <Card className="p-6 text-center bg-background/40 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean/20 to-ocean/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-ocean" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-ocean">Analyze</h3>
              <p className="text-sm text-muted-foreground">Our AI instantly identifies the waste type</p>
            </Card>
            
            <Card className="p-6 text-center bg-background/40 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-leaf/20 to-leaf/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-leaf" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-leaf">Recycle</h3>
              <p className="text-sm text-muted-foreground">Get personalized recycling instructions</p>
            </Card>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.9}>
          <div className="mt-12 text-center">
            <Card className="inline-block p-4 bg-background/40 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                🔒 Your images are processed securely and not stored permanently
              </p>
            </Card>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default Upload;