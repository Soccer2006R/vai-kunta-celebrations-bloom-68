
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const eventTypes = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'birthday', label: 'Birthday Celebration' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'anniversary', label: 'Anniversary' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'other', label: 'Other' },
];

const guestRanges = [
  { id: '1-50', label: '1-50 guests' },
  { id: '51-100', label: '51-100 guests' },
  { id: '101-200', label: '101-200 guests' },
  { id: '201-300', label: '201-300 guests' },
  { id: '301-500', label: '301-500 guests' },
  { id: '500+', label: 'More than 500 guests' },
];

const budgetRanges = [
  { id: 'budget', label: '₹1,00,000 - ₹3,00,000' },
  { id: 'mid', label: '₹3,00,000 - ₹6,00,000' },
  { id: 'premium', label: '₹6,00,000 - ₹10,00,000' },
  { id: 'luxury', label: 'Above ₹10,00,000' },
];

const PlanEventPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    
    // Basic Event Details
    eventType: '',
    eventDate: null,
    guestCount: '',
    budget: '',
    
    // Venue Preferences
    venueLocation: '',
    indoorOutdoor: '',
    venuePreferences: '',
    
    // Service Preferences
    needsCatering: false,
    foodPreferences: '',
    needsEntertainment: false,
    entertainmentPreferences: '',
    additionalServices: [],
    
    // Special Requests
    specialRequests: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  
  const goToNextStep = () => {
    window.scrollTo(0, 0);
    setStep(prevStep => prevStep + 1);
  };
  
  const goToPrevStep = () => {
    window.scrollTo(0, 0);
    setStep(prevStep => prevStep - 1);
  };
  
  const handleServiceToggle = (service) => {
    const services = [...formData.additionalServices];
    if (services.includes(service)) {
      const filtered = services.filter(s => s !== service);
      handleChange('additionalServices', filtered);
    } else {
      handleChange('additionalServices', [...services, service]);
    }
  };
  
  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.eventType && formData.eventDate && formData.guestCount && formData.budget;
      case 3:
        return formData.venueLocation && formData.indoorOutdoor;
      case 4:
        // No required fields for step 4
        return true;
      default:
        return true;
    }
  };
  
  const handleSubmit = () => {
    // In a real app, this would send data to a backend
    setIsSubmitted(true);
    toast({
      title: "Event Request Submitted!",
      description: "Our team will contact you within 24 hours."
    });
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <p className="text-vaikunta-charcoal/70">
              Please provide your contact details so our event specialists can reach you.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleTextChange} 
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleTextChange} 
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleTextChange} 
                  placeholder="Your contact number"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Event Details</h2>
            <p className="text-vaikunta-charcoal/70">
              Tell us about the event you're planning.
            </p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Event Type <span className="text-red-500">*</span></Label>
                <RadioGroup 
                  value={formData.eventType} 
                  onValueChange={(value) => handleChange('eventType', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                  {eventTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.id} id={`event-${type.id}`} />
                      <Label htmlFor={`event-${type.id}`}>{type.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Event Date <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.eventDate ? format(formData.eventDate, "PPP") : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.eventDate}
                      onSelect={(date) => handleChange('eventDate', date)}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Number of Guests <span className="text-red-500">*</span></Label>
                <RadioGroup 
                  value={formData.guestCount} 
                  onValueChange={(value) => handleChange('guestCount', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                  {guestRanges.map((range) => (
                    <div key={range.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={range.id} id={`guest-${range.id}`} />
                      <Label htmlFor={`guest-${range.id}`}>{range.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Budget Range <span className="text-red-500">*</span></Label>
                <RadioGroup 
                  value={formData.budget} 
                  onValueChange={(value) => handleChange('budget', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                  {budgetRanges.map((range) => (
                    <div key={range.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={range.id} id={`budget-${range.id}`} />
                      <Label htmlFor={`budget-${range.id}`}>{range.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Venue Preferences</h2>
            <p className="text-vaikunta-charcoal/70">
              Let us know your venue requirements.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="venueLocation">Preferred Location <span className="text-red-500">*</span></Label>
                <Select 
                  value={formData.venueLocation} 
                  onValueChange={(value) => handleChange('venueLocation', value)}
                >
                  <SelectTrigger id="venueLocation">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hyderabad-center">Hyderabad City Center</SelectItem>
                    <SelectItem value="hyderabad-outskirts">Hyderabad Outskirts</SelectItem>
                    <SelectItem value="secunderabad">Secunderabad</SelectItem>
                    <SelectItem value="gachibowli">Gachibowli</SelectItem>
                    <SelectItem value="hitech-city">Hitech City</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Venue Type <span className="text-red-500">*</span></Label>
                <RadioGroup 
                  value={formData.indoorOutdoor} 
                  onValueChange={(value) => handleChange('indoorOutdoor', value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="indoor" id="venue-indoor" />
                    <Label htmlFor="venue-indoor">Indoor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outdoor" id="venue-outdoor" />
                    <Label htmlFor="venue-outdoor">Outdoor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="venue-both" />
                    <Label htmlFor="venue-both">Both Indoor and Outdoor</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="venuePreferences">Additional Venue Requirements</Label>
                <Textarea 
                  id="venuePreferences" 
                  name="venuePreferences" 
                  value={formData.venuePreferences} 
                  onChange={handleTextChange} 
                  placeholder="Special venue requirements, amenities needed, etc."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Services & Special Requests</h2>
            <p className="text-vaikunta-charcoal/70">
              Select additional services and make any special requests.
            </p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="needsCatering" 
                    checked={formData.needsCatering}
                    onCheckedChange={(checked) => handleChange('needsCatering', checked)}
                  />
                  <Label htmlFor="needsCatering" className="font-medium">I need catering services</Label>
                </div>
                
                {formData.needsCatering && (
                  <div className="ml-6 mt-2">
                    <Label htmlFor="foodPreferences">Food Preferences</Label>
                    <Textarea 
                      id="foodPreferences" 
                      name="foodPreferences" 
                      value={formData.foodPreferences} 
                      onChange={handleTextChange} 
                      placeholder="Cuisine preferences, dietary restrictions, etc."
                      rows={3}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="needsEntertainment" 
                    checked={formData.needsEntertainment}
                    onCheckedChange={(checked) => handleChange('needsEntertainment', checked)}
                  />
                  <Label htmlFor="needsEntertainment" className="font-medium">I need entertainment services</Label>
                </div>
                
                {formData.needsEntertainment && (
                  <div className="ml-6 mt-2">
                    <Label htmlFor="entertainmentPreferences">Entertainment Preferences</Label>
                    <Textarea 
                      id="entertainmentPreferences" 
                      name="entertainmentPreferences" 
                      value={formData.entertainmentPreferences} 
                      onChange={handleTextChange} 
                      placeholder="DJ, live music, performers, etc."
                      rows={3}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Additional Services</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { id: 'decoration', label: 'Decoration Services' },
                    { id: 'photography', label: 'Photography & Videography' },
                    { id: 'transportation', label: 'Transportation' },
                    { id: 'security', label: 'Security Services' },
                    { id: 'staffing', label: 'Event Staffing' },
                    { id: 'cleanup', label: 'Cleanup Services' },
                  ].map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`service-${service.id}`} 
                        checked={formData.additionalServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <Label htmlFor={`service-${service.id}`}>{service.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Any Special Requests</Label>
                <Textarea 
                  id="specialRequests" 
                  name="specialRequests" 
                  value={formData.specialRequests} 
                  onChange={handleTextChange} 
                  placeholder="Any other special requirements or requests for your event..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Review Your Request</h2>
            <p className="text-vaikunta-charcoal/70">
              Please review the details of your event request before submitting.
            </p>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-vaikunta-charcoal/70">Name:</div>
                      <div>{formData.name}</div>
                      <div className="text-vaikunta-charcoal/70">Email:</div>
                      <div>{formData.email}</div>
                      <div className="text-vaikunta-charcoal/70">Phone:</div>
                      <div>{formData.phone}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Event Details</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-vaikunta-charcoal/70">Type:</div>
                      <div>{eventTypes.find(t => t.id === formData.eventType)?.label || formData.eventType}</div>
                      <div className="text-vaikunta-charcoal/70">Date:</div>
                      <div>{formData.eventDate ? format(formData.eventDate, 'PPP') : ''}</div>
                      <div className="text-vaikunta-charcoal/70">Guests:</div>
                      <div>{guestRanges.find(g => g.id === formData.guestCount)?.label || formData.guestCount}</div>
                      <div className="text-vaikunta-charcoal/70">Budget:</div>
                      <div>{budgetRanges.find(b => b.id === formData.budget)?.label || formData.budget}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Venue Preferences</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-vaikunta-charcoal/70">Location:</div>
                      <div>{formData.venueLocation}</div>
                      <div className="text-vaikunta-charcoal/70">Venue Type:</div>
                      <div>{formData.indoorOutdoor}</div>
                      {formData.venuePreferences && (
                        <>
                          <div className="text-vaikunta-charcoal/70">Additional Requirements:</div>
                          <div>{formData.venuePreferences}</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Services & Special Requests</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-vaikunta-charcoal/70">Catering:</div>
                      <div>{formData.needsCatering ? 'Yes' : 'No'}</div>
                      {formData.needsCatering && formData.foodPreferences && (
                        <>
                          <div className="text-vaikunta-charcoal/70">Food Preferences:</div>
                          <div>{formData.foodPreferences}</div>
                        </>
                      )}
                      
                      <div className="text-vaikunta-charcoal/70">Entertainment:</div>
                      <div>{formData.needsEntertainment ? 'Yes' : 'No'}</div>
                      {formData.needsEntertainment && formData.entertainmentPreferences && (
                        <>
                          <div className="text-vaikunta-charcoal/70">Entertainment Preferences:</div>
                          <div>{formData.entertainmentPreferences}</div>
                        </>
                      )}
                      
                      {formData.additionalServices.length > 0 && (
                        <>
                          <div className="text-vaikunta-charcoal/70">Additional Services:</div>
                          <div>{formData.additionalServices.join(', ')}</div>
                        </>
                      )}
                      
                      {formData.specialRequests && (
                        <>
                          <div className="text-vaikunta-charcoal/70">Special Requests:</div>
                          <div>{formData.specialRequests}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-6">
            <CheckCircle2 className="mx-auto h-16 w-16 text-vaikunta-gold" />
            <h1 className="text-3xl font-bold text-vaikunta-charcoal">Request Submitted Successfully!</h1>
            <p className="text-lg text-vaikunta-charcoal/70">
              Thank you for choosing Vaikunta for your event planning needs. One of our event specialists will review your request and contact you within 24 hours.
            </p>
            <div className="py-4">
              <p className="font-medium">Reference Number:</p>
              <p className="text-xl font-bold text-vaikunta-gold">{`EVT-${Date.now().toString().substr(-8)}`}</p>
            </div>
            <Button className="bg-vaikunta-gold hover:bg-vaikunta-gold/90" onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-vaikunta-charcoal mb-2 text-center">Plan Your Event</h1>
        <p className="text-lg text-center text-vaikunta-charcoal/70 mb-8">
          Let us help you create a memorable experience tailored to your needs.
        </p>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center w-full">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === stepNum 
                    ? 'bg-vaikunta-gold text-white' 
                    : step > stepNum 
                      ? 'bg-vaikunta-gold/20 text-vaikunta-gold'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                <span className="text-xs mt-1 hidden md:block">
                  {stepNum === 1 ? 'Personal Info' : 
                   stepNum === 2 ? 'Event Details' :
                   stepNum === 3 ? 'Venue' :
                   stepNum === 4 ? 'Services' : 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
            <div 
              className="absolute top-0 h-1 bg-vaikunta-gold transition-all duration-300" 
              style={{ width: `${(step - 1) * 25}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="border border-vaikunta-gold/20">
          <CardContent className="pt-6">
            {renderStepContent()}
            
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={goToPrevStep}
                  className="border-vaikunta-gold text-vaikunta-gold hover:bg-vaikunta-gold/10"
                >
                  Previous
                </Button>
              )}
              
              <div className="ml-auto">
                {step < 5 ? (
                  <Button 
                    onClick={goToNextStep}
                    disabled={!validateStep()}
                    className="bg-vaikunta-gold hover:bg-vaikunta-gold/90"
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    className="bg-vaikunta-gold hover:bg-vaikunta-gold/90"
                  >
                    Submit Request
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanEventPage;
