import { useState, useCallback } from "react";
import { Upload as UploadIcon, Camera, X, FileImage, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MotionButton } from "./MotionWrapper";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useClassification } from "@/contexts/ClassificationContext";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { file, imageUrl, setFile, setResult, isLoading, setIsLoading, reset, uploadImage } = useClassification();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelection(imageFile);
    }
  }, []);

  const handleFileSelection = async (file: File) => {
    setIsLoading(true);
    
    try {
      // Upload to Supabase Storage first
      const storedUrl = await uploadImage(file);
      
      if (storedUrl) {
        setFile(file);
        onFileSelect(file);
        
        toast({
          title: "Image Uploaded",
          description: "Image uploaded successfully and ready for classification.",
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
      e.target.value = ""; // Clear input to allow selecting the same file again
    }
  };

  const clearFile = () => {
    reset();
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setShowCamera(true);
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const capturePhoto = () => {
    const video = document.getElementById('camera-video') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          handleFileSelection(file);
          stopCamera();
        }
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const handleClassify = async () => {
    if (!file || !imageUrl) return;
    
    setIsLoading(true);
    
    try {
      // Convert stored image URL to blob for Hugging Face API
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      const apiResponse = await fetch('https://api-inference.huggingface.co/models/prithivMLmods/Trash-Net', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
          'Content-Type': blob.type,
        },
        body: blob,
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const rawResult = await apiResponse.json();
      
      // Transform HuggingFace response to our expected format
      const transformedResult = {
        category: rawResult[0]?.label || 'Unknown',
        confidence: rawResult[0]?.score || 0,
        probabilities: rawResult.reduce((acc: any, item: any) => {
          acc[item.label] = item.score;
          return acc;
        }, {})
      };

      setResult(transformedResult);
      
      toast({
        title: "Classification Complete",
        description: `Detected: ${transformedResult.category} (${Math.round(transformedResult.confidence * 100)}% confidence)`,
      });

      // Navigate to results page
      navigate('/result');
    } catch (error) {
      console.error('Classification error:', error);
      toast({
        title: "Classification Failed",
        description: "Failed to classify the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="upload"
          >
            <Card
              className={`p-12 border-2 border-dashed transition-all duration-300 cursor-pointer group hover:border-forest/40 ${
                isDragOver ? 'border-forest bg-forest/5 scale-105' : 'border-forest/20'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="text-center">
                <motion.div 
                  className="flex justify-center mb-6"
                  animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${
                    isDragOver ? 'bg-forest text-white' : 'bg-forest/10 text-forest group-hover:bg-forest/20'
                  }`}>
                    <UploadIcon className="w-10 h-10" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-4 text-forest">
                  {isDragOver ? 'Drop Your Image Here!' : 'Drag & Drop Your Image Here'}
                </h3>
                
                <p className="text-muted-foreground mb-8">
                  or choose an option below
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById('file-input')?.click();
                    }}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <UploadIcon className="w-4 h-4" />
                    Browse Files
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera();
                    }}
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    Supported: JPG, PNG, GIF
                  </div>
                  <div>Max size: 10MB</div>
                </div>
              </div>
            </Card>
            
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key="preview"
            className="space-y-6"
          >
            <Card className="p-6 border-forest/20">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-forest">Selected Image</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-muted max-h-64">
                  {imageUrl && (
                    <motion.img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-auto object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{file.name}</span>
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-center">
              <MotionButton>
                <Button
                  onClick={handleClassify}
                  disabled={isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-forest to-ocean hover:from-forest/90 hover:to-ocean/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Classify Image
                    </>
                  )}
                </Button>
              </MotionButton>
            </div>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-full bg-secondary rounded-full h-2 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-forest to-ocean h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-muted-foreground">
                  {!file ? 'Uploading image to secure storage...' : 'Our AI is analyzing your image for recyclable materials...'}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Preview Modal */}
      {showCamera && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <Card className="w-full max-w-lg mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Take Photo</h3>
              <Button variant="ghost" size="sm" onClick={stopCamera}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-black">
                <video
                  id="camera-video"
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                  ref={(video) => {
                    if (video && stream) {
                      video.srcObject = stream;
                    }
                  }}
                />
              </div>
              
              <div className="flex justify-center">
                <Button onClick={capturePhoto} size="lg" className="bg-forest hover:bg-forest/90">
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;