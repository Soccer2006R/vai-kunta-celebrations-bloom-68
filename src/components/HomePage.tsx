import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Calendar, Home, Utensils, Music, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const services = [
    {
      icon: <div className="w-10 h-10 text-primary-gold flex items-center justify-center"><Calendar className="w-6 h-6" /></div>,
      title: 'Event Planning',
      description: 'Complete event management from concept to execution',
      link: '/plan-event'
    },
    {
      icon: <div className="w-10 h-10 text-primary-gold flex items-center justify-center"><Home className="w-6 h-6" /></div>,
      title: 'Venue Selection',
      description: 'Curated venues perfect for your special occasion',
      link: '/venues'
    },
    {
      icon: <div className="w-10 h-10 text-primary-gold flex items-center justify-center"><Utensils className="w-6 h-6" /></div>,
      title: 'Catering Services',
      description: 'Delicious cuisine from top-rated caterers',
      link: '/catering'
    },
    {
      icon: <div className="w-10 h-10 text-primary-gold flex items-center justify-center"><Music className="w-6 h-6" /></div>,
      title: 'Entertainment',
      description: 'DJs, musicians, and performers for every celebration',
      link: '/entertainment'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      event: 'Wedding',
      quote: 'Vaikunta made our dream wedding come true with their attention to detail and seamless coordination.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100'
    },
    {
      name: 'Rajesh Kumar',
      event: 'Corporate Event',
      quote: 'Professional service and exceptional venues. Our company event was a huge success!',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100'
    },
    {
      name: 'Anita Patel',
      event: 'Birthday Celebration',
      quote: 'The team went above and beyond to create a magical birthday celebration for my daughter.',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100'
    }
  ];

  const stats = [
    { number: '1.2K+', label: 'Events Planned' },
    { number: '350+', label: 'Vendors Onboarded' },
    { number: '20+', label: 'Cities Covered' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#FAF8F0] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 h-full flex flex-col lg:flex-row items-center py-28">
          <div className="lg:w-1/2 max-w-2xl">
            <div className="text-sm text-primary-gold font-medium mb-2 flex items-center">
              <div className="w-10 h-px bg-primary-gold mr-3"></div>
              Premium Event Planning
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-[#b07c0c] mb-6">
              Craft Timeless Memories<br />
              <span className="text-destructive-maroon">with Vaikunta</span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-xl">
              Seamless event planning tailored to your dreams. From intimate gatherings to grand celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/plan-event" className="px-8 py-3 bg-primary-gold hover:bg-opacity-90 text-white rounded-lg flex items-center justify-center transition-all">
                  Plan Your Event
                  <Sparkles className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/vendors" className="px-8 py-3 border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all">
                  Become a Vendor
                </Link>
              </Button>
            </div>
            <div className="mt-20 grid grid-cols-3 gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-playfair text-3xl md:text-4xl text-[#b07c0c]">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="relative rounded-3xl overflow-hidden w-full aspect-[4/5] ml-auto" style={{ maxWidth: '500px' }}>
              <video
                src="/Hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-white to-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center">
            Where <span className="text-primary-gold">Tradition</span> Meets <span className="text-destructive-maroon">Elegance</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
            <div className="md:w-1/2">
              <div className="relative rounded-3xl overflow-hidden">
                <video
                  src="/About.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <h5 className="font-playfair text-lg font-bold mb-6">
                <span className="text-destructive-maroon">About Vaikunta</span>
              </h5>
              <p className="text-gray-700 mb-6 text-lg">
                With years of experience in creating unforgettable celebrations, Vaikunta understands 
                the cultural richness and diverse traditions that make each event unique.
              </p>
              <p className="text-gray-700 mb-8 text-lg">
                From traditional ceremonies to modern celebrations, we handle every detail with 
                personal care and professional expertise, ensuring your special day is nothing short of perfect.
              </p>
              <Link to="/about" className="inline-flex items-center text-primary font-medium hover:text-primary-gold transition-colors group">
                <span>Learn more about our journey</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Our Premium Services</h2>
            <p className="text-gray-600 text-lg">
              Comprehensive event planning services to make your celebration extraordinary
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover-lift hover-glow transition-all duration-300 border-0"
              >
                <CardContent className="p-0">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="font-playfair text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-primary font-medium hover:text-primary-gold transition-colors group"
                  >
                    <span>Explore</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-gray-600 text-lg">
              Hear from those who trusted us with their special moments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="celebration-card border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="font-playfair font-bold">{testimonial.name}</h4>
                      <p className="text-primary-gold text-sm">{testimonial.event}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/plan-event" className="px-8 py-3 bg-primary-gold hover:bg-opacity-90 text-white rounded-lg flex items-center justify-center transition-all">
                Start Your Celebration
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-gold to-destructive-maroon">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-white">
            Your Perfect Event Starts Here
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            Ready to create memories that will last a lifetime? Let's start planning your dream event today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link to="/plan-event" className="px-8 py-3 bg-white hover:bg-opacity-90 text-primary-gold rounded-lg flex items-center justify-center transition-all">
                Plan Your Event
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact" className="px-8 py-3 border border-white text-white hover:bg-white hover:text-primary-gold rounded-lg flex items-center justify-center transition-all">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;