
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, MapPin, Clock, Users, ChefHat, Utensils, Coffee, Cake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cateringServices } from '../data/dummyData';

const CateringPage = () => {
  const { dispatch } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: Utensils },
    { id: 'wedding', name: 'Wedding Catering', icon: Cake },
    { id: 'corporate', name: 'Corporate Events', icon: Coffee },
    { id: 'traditional', name: 'Traditional Cuisine', icon: ChefHat },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? cateringServices 
    : cateringServices.filter(service => service.category === selectedCategory);

  const handleAddToCart = (service: any) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: service.id,
        name: service.name,
        price: service.price,
        type: 'catering',
        image: service.image
      }
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-vaikunta-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-vaikunta-charcoal mb-4">
            Premium Catering Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exquisite culinary experiences for your special occasions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 ${
                selectedCategory === category.id 
                  ? 'bg-vaikunta-gold hover:bg-vaikunta-gold/90' 
                  : 'border-vaikunta-gold text-vaikunta-gold hover:bg-vaikunta-gold hover:text-white'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {service.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-vaikunta-charcoal">{service.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{service.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Serves {service.capacity} people</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{service.preparationTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {service.specialties?.map((specialty: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-vaikunta-gold">
                        ₹{service.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/event</span>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(service)}
                      className="bg-vaikunta-gold hover:bg-vaikunta-gold/90"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CateringPage;
