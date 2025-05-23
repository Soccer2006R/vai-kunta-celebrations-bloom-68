
export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  image: string;
  description: string;
  amenities: string[];
  isBooked: boolean;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  items: string[];
}

export interface Caterer {
  id: string;
  name: string;
  cuisineType: string;
  image: string;
  description: string;
  packages: CateringPackage[];
  rating: number;
}

export interface Entertainment {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  price: number;
  availableDates: string[];
}

export interface Service {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  pricePerHour: number;
}

export interface CartItem {
  id: string;
  type: 'venue' | 'catering' | 'entertainment' | 'service';
  item: any;
  details: {
    date?: string;
    time?: string;
    guests?: number;
    package?: string;
    staffCount?: number;
  };
  price: number;
}

export const venues: Venue[] = [
  {
    id: 'v1',
    name: 'Royal Gardens Resort',
    location: 'Mumbai, Maharashtra',
    capacity: 500,
    price: 150000,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800',
    description: 'Luxurious resort perfect for grand celebrations with beautiful gardens and modern amenities.',
    amenities: ['Garden Area', 'AC Banquet Hall', 'Parking', 'Catering Kitchen', 'Bridal Suite'],
    isBooked: false
  },
  {
    id: 'v2',
    name: 'Heritage Palace',
    location: 'Jaipur, Rajasthan',
    capacity: 300,
    price: 200000,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    description: 'Majestic palace venue with traditional Rajasthani architecture and royal ambiance.',
    amenities: ['Royal Courtyard', 'Traditional Decor', 'Heritage Rooms', 'Cultural Shows'],
    isBooked: false
  },
  {
    id: 'v3',
    name: 'Lakeside Villa',
    location: 'Udaipur, Rajasthan',
    capacity: 200,
    price: 120000,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800',
    description: 'Serene lakeside venue perfect for intimate celebrations with stunning water views.',
    amenities: ['Lake View', 'Boat Rides', 'Sunset Deck', 'Private Beach'],
    isBooked: true
  }
];

export const caterers: Caterer[] = [
  {
    id: 'c1',
    name: 'Spice Garden Catering',
    cuisineType: 'North Indian',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800',
    description: 'Authentic North Indian cuisine with traditional recipes and modern presentation.',
    rating: 4.8,
    packages: [
      {
        id: 'p1',
        name: 'Royal Feast',
        description: 'Premium package with 8 main courses',
        pricePerPerson: 1200,
        items: ['Paneer Butter Masala', 'Dal Makhani', 'Biryani', 'Naan', 'Raita', 'Dessert']
      },
      {
        id: 'p2',
        name: 'Classic Package',
        description: 'Standard package with 5 main courses',
        pricePerPerson: 800,
        items: ['Curry', 'Rice', 'Roti', 'Salad', 'Sweet']
      }
    ]
  },
  {
    id: 'c2',
    name: 'Coastal Delights',
    cuisineType: 'South Indian',
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800',
    description: 'Fresh coastal flavors with traditional South Indian specialties.',
    rating: 4.6,
    packages: [
      {
        id: 'p3',
        name: 'Coastal Special',
        description: 'Seafood and vegetarian South Indian delicacies',
        pricePerPerson: 1000,
        items: ['Fish Curry', 'Sambar', 'Rice', 'Coconut Chutney', 'Payasam']
      }
    ]
  }
];

export const entertainment: Entertainment[] = [
  {
    id: 'e1',
    name: 'DJ Rhythms',
    type: 'DJ',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800',
    description: 'Professional DJ with latest sound system and lighting for unforgettable parties.',
    price: 25000,
    availableDates: ['2024-01-15', '2024-01-20', '2024-01-25']
  },
  {
    id: 'e2',
    name: 'Classical Ensemble',
    type: 'Musicians',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    description: 'Traditional Indian classical musicians for elegant celebrations.',
    price: 35000,
    availableDates: ['2024-01-18', '2024-01-22', '2024-01-28']
  }
];

export const services: Service[] = [
  {
    id: 's1',
    name: 'Professional Servers',
    type: 'Server',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800',
    description: 'Experienced servers to ensure smooth service throughout your event.',
    pricePerHour: 500
  },
  {
    id: 's2',
    name: 'Bartending Service',
    type: 'Bartender',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800',
    description: 'Professional bartenders with extensive cocktail knowledge.',
    pricePerHour: 800
  }
];
