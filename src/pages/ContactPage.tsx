
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to a backend
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible."
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-vaikunta-charcoal mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-center text-vaikunta-charcoal/70 mb-12 max-w-3xl mx-auto">
          Have questions about our services or need help planning your event? 
          Get in touch with our team, and we'll be happy to assist you.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form */}
          <Card className="col-span-2 p-6 border border-vaikunta-gold/20">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Event Inquiry" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Your Message <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event or inquiry..." 
                  rows={5}
                />
              </div>
              
              <Button type="submit" className="w-full bg-vaikunta-gold hover:bg-vaikunta-gold/90">
                Send Message
              </Button>
            </form>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6 border border-vaikunta-gold/20">
              <h3 className="text-xl font-medium mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-vaikunta-gold mt-1" />
                  <div>
                    <p className="font-medium">Address:</p>
                    <p className="text-vaikunta-charcoal/70">
                      Vaikunta Events Pvt. Ltd.<br />
                      123 Jubilee Hills<br />
                      Hyderabad, Telangana 500033
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-vaikunta-gold mt-1" />
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p className="text-vaikunta-charcoal/70">+91 98765 43210</p>
                    <p className="text-vaikunta-charcoal/70">+91 80123 45678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-vaikunta-gold mt-1" />
                  <div>
                    <p className="font-medium">Email:</p>
                    <p className="text-vaikunta-charcoal/70">info@vaikunta.com</p>
                    <p className="text-vaikunta-charcoal/70">support@vaikunta.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-vaikunta-gold mt-1" />
                  <div>
                    <p className="font-medium">Business Hours:</p>
                    <p className="text-vaikunta-charcoal/70">Monday to Friday: 9 AM - 6 PM</p>
                    <p className="text-vaikunta-charcoal/70">Saturday: 10 AM - 4 PM</p>
                    <p className="text-vaikunta-charcoal/70">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-vaikunta-gold/20">
              <h3 className="text-xl font-medium mb-4">Emergency Support</h3>
              <p className="text-vaikunta-charcoal/70 mb-4">
                For urgent event-day support, please contact our emergency line:
              </p>
              <div className="bg-vaikunta-gold/10 p-4 rounded-md">
                <p className="font-semibold text-center">+91 98005 77777</p>
                <p className="text-sm text-center text-vaikunta-charcoal/70 mt-1">
                  Available 24/7 for event day emergencies
                </p>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Google Map (Placeholder) */}
        <div className="mt-12 border border-vaikunta-gold/20 rounded-lg overflow-hidden h-[400px] bg-gray-100 flex items-center justify-center">
          <p className="text-vaikunta-charcoal/70 text-center">
            Google Maps Embed goes here.<br />
            In a real application, this would be an embedded Google Map showing your location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
