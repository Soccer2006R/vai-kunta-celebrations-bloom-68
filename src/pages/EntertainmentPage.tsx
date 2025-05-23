import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';

const entertainmentData = [
  {
    id: 'e1',
    name: 'DJ Harmony',
    type: 'DJ',
    image: 'https://images.unsplash.com/photo-1571266028243-e1f0e45394fd?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Expert DJ with over 10 years of experience in weddings and corporate events. Specializes in Bollywood, Western, and fusion music.',
    price: 25000,
  },
  {
    id: 'e2',
    name: 'Magical Moments',
    type: 'Magician',
    image: 'https://images.unsplash.com/photo-1541848756149-e3843dfdd498?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Professional magician offering close-up magic and stage performances for all ages. Perfect for creating unforgettable entertainment.',
    price: 18000,
  },
  {
    id: 'e3',
    name: 'Classical Strings',
    type: 'Live Music',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Quartet offering elegant classical and contemporary arrangements. Perfect for ceremonies and sophisticated receptions.',
    price: 35000,
  },
  {
    id: 'e4',
    name: 'Rhythmic Dancers',
    type: 'Dance Troupe',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Professional dance group performing various styles from classical to contemporary. Customized performances for any event.',
    price: 40000,
  },
  {
    id: 'e5',
    name: 'Comedy Central',
    type: 'Comedian',
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Stand-up comedian specializing in clean, family-friendly humor. Great for corporate events and wedding receptions.',
    price: 22000,
  },
  {
    id: 'e6',
    name: 'Photo Memories',
    type: 'Photo Booth',
    image: 'https://images.unsplash.com/photo-1532117892888-38948e152b3a?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Interactive photo booth with props, backdrops, and instant printing. Includes digital copies and custom designs.',
    price: 15000,
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

const EntertainmentPage = () => {
  const { dispatch } = useApp();
  const [selectedEntertainment, setSelectedEntertainment] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  
  const openBookingModal = (entertainment) => {
    setSelectedEntertainment(entertainment);
    setIsBookingOpen(true);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete Information",
        description: "Please select both date and time",
        variant: "destructive"
      });
      return;
    }
    
    // Add to cart - Fix the type issue by using as const
    const cartItem = {
      id: `entertainment-${Date.now()}`,
      type: "entertainment" as const,  // Use as const to ensure correct type
      item: selectedEntertainment,
      details: {
        date: format(selectedDate, 'PPP'),
        time: selectedTime,
      },
      price: selectedEntertainment.price
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    setIsBookingOpen(false);
    
    toast({
      title: "Entertainment Added",
      description: `${selectedEntertainment.name} has been added to your cart.`
    });
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-vaikunta-charcoal mb-8 text-center">Entertainment Options</h1>
        <p className="text-lg text-center text-vaikunta-charcoal/70 mb-12 max-w-3xl mx-auto">
          Add excitement and joy to your event with our curated selection of entertainment options. From music to magical performances, create unforgettable moments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entertainmentData.map((entertainment) => (
            <Card key={entertainment.id} className="overflow-hidden border border-vaikunta-gold/20 hover:shadow-lg transition-shadow duration-300">
              <div className="h-60 overflow-hidden">
                <img 
                  src={entertainment.image} 
                  alt={entertainment.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-vaikunta-charcoal">{entertainment.name}</CardTitle>
                <CardDescription>{entertainment.type}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-vaikunta-charcoal/70 mb-4">{entertainment.description}</p>
                <p className="font-semibold text-vaikunta-gold">₹{entertainment.price.toLocaleString()}</p>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => openBookingModal(entertainment)}
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
              {selectedEntertainment && `Book ${selectedEntertainment.name}`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
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
              <Label htmlFor="time">Select Time Slot</Label>
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
              <div className="flex justify-between items-center font-semibold">
                <span>Total:</span>
                <span className="text-vaikunta-gold">
                  ₹{selectedEntertainment?.price.toLocaleString()}
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

export default EntertainmentPage;
