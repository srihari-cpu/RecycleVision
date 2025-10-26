-- Create storage bucket for uploaded images
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);

-- Create RLS policies for the uploads bucket
CREATE POLICY "Anyone can upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Anyone can view uploaded images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'uploads');

CREATE POLICY "Users can delete their own uploads" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'uploads');