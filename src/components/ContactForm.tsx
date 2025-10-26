import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { MotionButton } from "./MotionWrapper";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) {
        throw error;
      }

      setFormData({ name: "", email: "", message: "" });
      
      toast({
        title: "Message sent successfully! 🎉",
        description: "We'll get back to you within 24 hours. Thank you for helping make the world more sustainable!",
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-background to-sky/5 border-forest/20 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-forest font-medium">
              Name
            </Label>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-forest/20 focus:border-forest focus:ring-forest/20"
                placeholder="Enter your full name"
              />
            </motion.div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-forest font-medium">
              Email
            </Label>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-forest/20 focus:border-forest focus:ring-forest/20"
                placeholder="Enter your email address"
              />
            </motion.div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-forest font-medium">
              Message
            </Label>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="border-forest/20 focus:border-forest focus:ring-forest/20 resize-none"
                placeholder="Tell us about your recycling questions or feedback..."
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <MotionButton className="w-full">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
              size="lg"
              className="w-full bg-gradient-to-r from-forest to-ocean hover:from-forest/90 hover:to-ocean/90 text-white py-6 text-lg rounded-xl shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </MotionButton>
        </motion.div>
      </form>
    </Card>
  );
};

export default ContactForm;