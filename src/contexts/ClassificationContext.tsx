import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface ClassificationResult {
  category: string;
  confidence: number;
  probabilities: Record<string, number>;
}

interface ClassificationContextType {
  file: File | null;
  imageUrl: string | null;
  storagePath: string | null;
  result: ClassificationResult | null;
  isLoading: boolean;
  setFile: (file: File) => void;
  setResult: (result: ClassificationResult | null) => void;
  setIsLoading: (loading: boolean) => void;
  uploadImage: (file: File) => Promise<string | null>;
  reset: () => void;
}

const ClassificationContext = createContext<ClassificationContextType | undefined>(undefined);

export const useClassification = () => {
  const context = useContext(ClassificationContext);
  if (context === undefined) {
    throw new Error('useClassification must be used within a ClassificationProvider');
  }
  return context;
};

interface ClassificationProviderProps {
  children: ReactNode;
}

export const ClassificationProvider: React.FC<ClassificationProviderProps> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [storagePath, setStoragePath] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetFile = (newFile: File) => {
    setFile(newFile);
    // Create image URL for preview
    const url = URL.createObjectURL(newFile);
    setImageUrl(url);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      setStoragePath(fileName);
      return publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  };

  const reset = () => {
    setFile(null);
    if (imageUrl && !imageUrl.startsWith('http')) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl(null);
    setStoragePath(null);
    setResult(null);
    setIsLoading(false);
  };

  return (
    <ClassificationContext.Provider 
      value={{ 
        file, 
        imageUrl, 
        storagePath,
        result, 
        isLoading, 
        setFile: handleSetFile, 
        setResult, 
        setIsLoading, 
        uploadImage,
        reset 
      }}
    >
      {children}
    </ClassificationContext.Provider>
  );
};