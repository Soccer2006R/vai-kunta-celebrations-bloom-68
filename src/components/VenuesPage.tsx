import React, { useState } from 'react';
import { venues } from '../data/dummyData';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';
import { cn } from '../lib/utils';

const VenuesPage = () => {
  const { dispatch } = useApp();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    guests: '',
    date: null,
    timeFrame: '10am-4pm'
  });

  const handleAddToCart = (venue) => {
    if (!bookingDetails.guests || !bookingDetails.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const cartItem = {
      id: `venue-${venue.id}-${Date.now()}`,
      type: 'venue' as const, // Using 'as const' to specify the exact literal type
      item: venue,
      details: {
        guests: parseInt(bookingDetails.guests),
        date: format(bookingDetails.date, 'yyyy-MM-dd'),
        time: bookingDetails.timeFrame
      },
      price: venue.price
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    toast({
      title: "Added to Cart",
      description: `${venue.name} has been added to your cart`
    });

    // Reset form
    setBookingDetails({ guests: '', date: null, timeFrame: '10am-4pm' });
  };

  return (
    <div className="min-h-screen bg-vaikunta-warm pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-vaikunta-charcoal mb-4">Premium Venues</h1>
          <p className="text-lg text-vaikunta-charcoal/80 max-w-2xl mx-auto">
            Discover the perfect venue for your special celebration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="relative">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                {venue.isBooked && (
                  <Badge className="absolute top-2 right-2 bg-red-500">Booked</Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-vaikunta-charcoal mb-2">{venue.name}</h3>
                <div className="flex items-center text-vaikunta-charcoal/70 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{venue.location}</span>
                </div>
                <div className="flex items-center text-vaikunta-charcoal/70 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">Capacity: {venue.capacity} guests</span>
                </div>
                <div className="text-2xl font-bold text-vaikunta-gold mb-4">
                  ₹{venue.price.toLocaleString()}
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{venue.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img src={venue.image} alt={venue.name} className="w-full h-64 object-cover rounded" />
                        <p className="text-vaikunta-charcoal/80">{venue.description}</p>
                        <div>
                          <h4 className="font-semibold mb-2">Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {venue.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary">{amenity}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="flex-1 bg-vaikunta-gold hover:bg-vaikunta-gold/90"
                        disabled={venue.isBooked}
                      >
                        {venue.isBooked ? 'Booked' : 'Add to Cart'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book {venue.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guests">Number of Guests *</Label>
                          <Input
                            id="guests"
                            type="number"
                            value={bookingDetails.guests}
                            onChange={(e) => setBookingDetails({...bookingDetails, guests: e.target.value})}
                            placeholder="Enter number of guests"
                          />
                        </div>
                        
                        <div>
                          <Label>Event Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !bookingDetails.date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingDetails.date ? format(bookingDetails.date, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={bookingDetails.date}
                                onSelect={(date) => setBookingDetails({...bookingDetails, date})}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <Label>Time Frame</Label>
                          <select 
                            className="w-full p-2 border rounded"
                            value={bookingDetails.timeFrame}
                            onChange={(e) => setBookingDetails({...bookingDetails, timeFrame: e.target.value})}
                          >
                            <option value="10am-4pm">10 AM - 4 PM</option>
                            <option value="6pm-12am">6 PM - 12 AM</option>
                          </select>
                        </div>

                        <Button 
                          onClick={() => handleAddToCart(venue)}
                          className="w-full bg-vaikunta-gold hover:bg-vaikunta-gold/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenuesPage;
