
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

const catererData = [
  {
    id: 'c1',
    name: 'Royal Indian Cuisine',
    cuisineType: 'Indian',
    image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Authentic Indian cuisine with rich flavors and traditional recipes.',
    packages: [
      { id: 'p1', name: 'Basic Package', pricePerPerson: 1200 },
      { id: 'p2', name: 'Premium Package', pricePerPerson: 2000 },
      { id: 'p3', name: 'Deluxe Package', pricePerPerson: 3500 },
    ],
    menuItems: [
      { name: 'Butter Chicken', description: 'Tender chicken in rich tomato and butter sauce', category: 'Main Course' },
      { name: 'Dal Makhani', description: 'Black lentils simmered overnight with spices', category: 'Main Course' },
      { name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled to perfection', category: 'Appetizer' },
      { name: 'Naan', description: 'Traditional Indian bread from tandoor oven', category: 'Bread' },
      { name: 'Gulab Jamun', description: 'Sweet milk dumplings soaked in rose syrup', category: 'Dessert' },
    ]
  },
  {
    id: 'c2',
    name: 'Italian Delights',
    cuisineType: 'Italian',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Exquisite Italian dishes from pasta to tiramisu, perfect for any event.',
    packages: [
      { id: 'p1', name: 'Basic Italian', pricePerPerson: 1400 },
      { id: 'p2', name: 'Premium Italian', pricePerPerson: 2200 },
      { id: 'p3', name: 'Gourmet Italian', pricePerPerson: 3800 },
    ],
    menuItems: [
      { name: 'Margherita Pizza', description: 'Classic tomato, mozzarella and basil pizza', category: 'Main Course' },
      { name: 'Spaghetti Carbonara', description: 'Pasta with egg, cheese and pancetta', category: 'Main Course' },
      { name: 'Bruschetta', description: 'Toasted bread with tomato, garlic and olive oil', category: 'Appetizer' },
      { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', category: 'Dessert' },
      { name: 'Caprese Salad', description: 'Tomato and mozzarella salad with basil', category: 'Salad' },
    ]
  },
  {
    id: 'c3',
    name: 'Asian Fusion',
    cuisineType: 'Pan-Asian',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Blend of Chinese, Japanese, and Thai cuisines with modern twists.',
    packages: [
      { id: 'p1', name: 'Asian Basics', pricePerPerson: 1300 },
      { id: 'p2', name: 'Asian Premium', pricePerPerson: 2100 },
      { id: 'p3', name: 'Asian Luxury', pricePerPerson: 3600 },
    ],
    menuItems: [
      { name: 'Sushi Platter', description: 'Assorted fresh sushi selection', category: 'Appetizer' },
      { name: 'Pad Thai', description: 'Stir-fried rice noodles with eggs, vegetables, and tofu', category: 'Main Course' },
      { name: 'Kung Pao Chicken', description: 'Spicy, stir-fried Chinese dish with diced chicken', category: 'Main Course' },
      { name: 'Miso Soup', description: 'Traditional Japanese soup with fermented soybean paste', category: 'Soup' },
      { name: 'Mango Sticky Rice', description: 'Sweet Thai dessert with glutinous rice and fresh mango', category: 'Dessert' },
    ]
  },
  {
    id: 'c4',
    name: 'Continental Classics',
    cuisineType: 'Continental',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'European inspired cuisine with fine dining presentation.',
    packages: [
      { id: 'p1', name: 'Continental Standard', pricePerPerson: 1500 },
      { id: 'p2', name: 'Continental Premium', pricePerPerson: 2500 },
      { id: 'p3', name: 'Continental Elite', pricePerPerson: 4000 },
    ],
    menuItems: [
      { name: 'Beef Wellington', description: 'Filet steak coated with pâté and duxelles', category: 'Main Course' },
      { name: 'Ratatouille', description: 'French Provençal vegetable stew', category: 'Main Course' },
      { name: 'French Onion Soup', description: 'Onion soup topped with croutons and cheese', category: 'Soup' },
      { name: 'Escargot', description: 'Cooked land snails with garlic butter', category: 'Appetizer' },
      { name: 'Crème Brûlée', description: 'Custard dessert with caramelized sugar topping', category: 'Dessert' },
    ]
  }
];

const CateringPage = () => {
  const { dispatch } = useApp();
  const [selectedCaterer, setSelectedCaterer] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuCaterer, setMenuCaterer] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [guestCount, setGuestCount] = useState(50);
  const [date, setDate] = useState(null);
  
  const openBookingModal = (caterer) => {
    setSelectedCaterer(caterer);
    setIsBookingOpen(true);
  };

  const openMenuModal = (caterer) => {
    setMenuCaterer(caterer);
    setIsMenuOpen(true);
  };

  const handleBooking = () => {
    if (!selectedPackage || !date || guestCount < 1) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Calculate total price
    const totalPrice = selectedPackage.pricePerPerson * guestCount;
    
    // Add to cart - Fix the type issue by using as const
    const cartItem = {
      id: `catering-${Date.now()}`,
      type: "catering" as const,  // Use as const to ensure correct type
      item: selectedCaterer,
      details: {
        package: selectedPackage.name,
        guests: guestCount,
        date: format(date, 'PPP'),
      },
      price: totalPrice
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    setIsBookingOpen(false);
    
    toast({
      title: "Catering Added",
      description: `${selectedCaterer.name} has been added to your cart.`
    });
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-vaikunta-charcoal mb-8 text-center">Catering Services</h1>
        <p className="text-lg text-center text-vaikunta-charcoal/70 mb-12 max-w-3xl mx-auto">
          Elevate your event with our exceptional catering options. From traditional delicacies to international cuisines, our partners bring unmatched flavors to your celebration.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catererData.map((caterer) => (
            <Card key={caterer.id} className="overflow-hidden border border-vaikunta-gold/20 hover:shadow-lg transition-shadow duration-300">
              <div className="h-60 overflow-hidden">
                <img 
                  src={caterer.image} 
                  alt={caterer.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-vaikunta-charcoal">{caterer.name}</CardTitle>
                <CardDescription>{caterer.cuisineType} Cuisine</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-vaikunta-charcoal/70">{caterer.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  className="border-vaikunta-gold text-vaikunta-gold hover:bg-vaikunta-gold hover:text-white"
                  onClick={() => openMenuModal(caterer)}
                >
                  View Menu
                </Button>
                <Button 
                  onClick={() => openBookingModal(caterer)}
                  className="bg-vaikunta-gold hover:bg-vaikunta-gold/90 text-white"
                >
                  Book Catering
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
              {selectedCaterer && `Book ${selectedCaterer.name}`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="package">Select Package</Label>
              <Select onValueChange={(value) => {
                const pkg = selectedCaterer?.packages.find(p => p.id === value);
                setSelectedPackage(pkg);
              }}>
                <SelectTrigger id="package">
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCaterer?.packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.name} (₹{pkg.pricePerPerson} per person)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="10"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date();
                      return date < today;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {selectedPackage && guestCount > 0 && (
              <div className="pt-2 border-t border-vaikunta-gold/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-vaikunta-charcoal/70">Price per person:</span>
                  <span className="font-medium">₹{selectedPackage.pricePerPerson}</span>
                </div>
                <div className="flex justify-between items-center font-semibold mt-1">
                  <span>Total:</span>
                  <span className="text-vaikunta-gold">₹{selectedPackage.pricePerPerson * guestCount}</span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button className="bg-vaikunta-gold hover:bg-vaikunta-gold/90 w-full" onClick={handleBooking}>
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Menu Modal */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-vaikunta-charcoal">
              {menuCaterer && `${menuCaterer.name} Menu`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {menuCaterer && (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-vaikunta-gold">Packages Available</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {menuCaterer.packages.map((pkg) => (
                      <div key={pkg.id} className="border border-vaikunta-gold/20 rounded-lg p-3 bg-vaikunta-warm/5">
                        <h4 className="font-medium">{pkg.name}</h4>
                        <p className="text-vaikunta-gold font-semibold">₹{pkg.pricePerPerson} per person</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-vaikunta-gold">Menu Items</h3>
                  
                  {/* Group menu items by category */}
                  {Array.from(new Set(menuCaterer.menuItems.map(item => item.category))).map(category => (
                    <div key={category} className="mb-6">
                      <h4 className="text-lg font-medium mb-2 border-b border-vaikunta-gold/20 pb-1">{category}</h4>
                      <div className="grid gap-4">
                        {menuCaterer.menuItems
                          .filter(item => item.category === category)
                          .map((item, index) => (
                            <div key={index} className="flex flex-col">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-sm text-vaikunta-charcoal/70">{item.description}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => {
                setIsMenuOpen(false);
                if (menuCaterer) {
                  openBookingModal(menuCaterer);
                }
              }}
              className="bg-vaikunta-gold hover:bg-vaikunta-gold/90"
            >
              Book This Caterer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CateringPage;
