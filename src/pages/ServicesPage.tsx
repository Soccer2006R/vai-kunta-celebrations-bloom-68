import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';

const servicesData = [
  {
    id: 's1',
    name: 'Professional Bartenders',
    type: 'Staff',
    image: 'https://images.unsplash.com/photo-1442544213729-6a15f1611937?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Experienced bartenders to serve drinks at your event. Skilled in classic and signature cocktails.',
    pricePerHour: 2000,
  },
  {
    id: 's2',
    name: 'Waitstaff Services',
    type: 'Staff',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Professional waiters and waitresses for table service and food distribution at your event.',
    pricePerHour: 1500,
  },
  {
    id: 's3',
    name: 'Event Decorators',
    type: 'Decoration',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Creative decorators to transform your venue with elegant themes and personalized touches.',
    pricePerHour: 3000,
  },
  {
    id: 's4',
    name: 'Cleaning Crew',
    type: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Post-event cleaning services to ensure the venue is spotless after your celebration.',
    pricePerHour: 1200,
  },
  {
    id: 's5',
    name: 'Valet Parking',
    type: 'Logistics',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Professional valet service to manage guest parking and ensure a smooth arrival experience.',
    pricePerHour: 1800,
  },
  {
    id: 's6',
    name: 'Event Security',
    type: 'Security',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Trained security personnel to ensure the safety and security of your event and guests.',
    pricePerHour: 2200,
  }
];

const timeSlots = [
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
  '8:00 PM - 10:00 PM',
  '10:00 PM - 12:00 AM'
];

const ServicesPage = () => {
  const { dispatch } = useApp();
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [staffCount, setStaffCount] = useState(1);
  const [hours, setHours] = useState(4); // Default 4 hours
  
  const openBookingModal = (service) => {
    setSelectedService(service);
    setStaffCount(1);
    setHours(4);
    setIsBookingOpen(true);
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    return selectedService.pricePerHour * hours * staffCount;
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || staffCount < 1 || hours < 1) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add to cart - Fix the type issue by using as const
    const cartItem = {
      id: `service-${Date.now()}`,
      type: "service" as const,  // Use as const to ensure correct type
      item: selectedService,
      details: {
        date: format(selectedDate, 'PPP'),
        time: selectedTime,
        staffCount: staffCount,
        hours: hours
      },
      price: calculateTotal()
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    setIsBookingOpen(false);
    
    toast({
      title: "Service Added",
      description: `${selectedService.name} has been added to your cart.`
    });
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-vaikunta-charcoal mb-8 text-center">Additional Services</h1>
        <p className="text-lg text-center text-vaikunta-charcoal/70 mb-12 max-w-3xl mx-auto">
          Enhance your event with our premium support services. From professional staff to decorations, we ensure every detail is taken care of.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Card key={service.id} className="overflow-hidden border border-vaikunta-gold/20 hover:shadow-lg transition-shadow duration-300">
              <div className="h-60 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-vaikunta-charcoal">{service.name}</CardTitle>
                <CardDescription>{service.type}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-vaikunta-charcoal/70 mb-4">{service.description}</p>
                <p className="font-semibold text-vaikunta-gold">₹{service.pricePerHour.toLocaleString()} per hour</p>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => openBookingModal(service)}
                  className="w-full bg-vaikunta-gold hover:bg-vaikunta-gold/90 text-white"
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedService && `Book ${selectedService.name}`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="staff">Number of Staff</Label>
              <Input
                id="staff"
                type="number"
                min="1"
                max="20"
                value={staffCount}
                onChange={(e) => setStaffCount(parseInt(e.target.value) || 1)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hours">Hours Required</Label>
              <Input
                id="hours"
                type="number"
                min="2"
                max="12"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 2)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
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
              <Label htmlFor="time">Starting Time</Label>
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time slot">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {selectedTime || "Select time slot"}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2 border-t border-vaikunta-gold/20">
              <div className="flex justify-between items-center text-sm">
                <span>Rate per hour:</span>
                <span>₹{selectedService?.pricePerHour.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Staff count:</span>
                <span>{staffCount}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Hours:</span>
                <span>{hours}</span>
              </div>
              <div className="flex justify-between items-center font-semibold mt-2">
                <span>Total:</span>
                <span className="text-vaikunta-gold">
                  ₹{calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button className="bg-vaikunta-gold hover:bg-vaikunta-gold/90 w-full" onClick={handleBooking}>
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesPage;
