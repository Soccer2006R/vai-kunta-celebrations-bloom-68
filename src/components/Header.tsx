
import React from 'react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { state, dispatch } = useApp();

  const handleBecomeVendor = () => {
    // Add URL parameter to indicate vendor registration flow
    const url = new URL(window.location.href);
    url.searchParams.set('vendor', 'true');
    window.history.pushState({}, '', url);
    
    dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(248,245,236,0.95)] backdrop-blur-md border-b border-vaikunta-gold/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-vaikunta-gold">
            Vaikunta
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-vaikunta-charcoal hover:text-vaikunta-gold transition-colors">
              Home
            </Link>
            <Link to="/venues" className="text-vaikunta-charcoal hover:text-vaikunta-gold transition-colors">
              Venues
            </Link>
            <Link to="/catering" className="text-vaikunta-charcoal hover:text-vaikunta-gold transition-colors">
              Catering
            </Link>
            <Link to="/entertainment" className="text-vaikunta-charcoal hover:text-vaikunta-gold transition-colors">
              Entertainment
            </Link>
            <Link to="/services" className="text-vaikunta-charcoal hover:text-vaikunta-gold transition-colors">
              Services
            </Link>
            <Link to="/plan-event" className="text-vaikunta-charcoal hover:text-vaikunta-gold transition-colors">
              Plan an Event
            </Link>
            <Link to="/contact" className="text-vaikunta-charcoal hover:text-vaikunta-gold transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
              className="border-vaikunta-gold text-vaikunta-gold hover:bg-vaikunta-gold hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              {state.user ? state.user.name : 'Login'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="border-vaikunta-gold text-vaikunta-gold hover:bg-vaikunta-gold hover:text-white relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {state.cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-vaikunta-maroon text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {state.cart.length}
                </span>
              )}
            </Button>

            <Button 
              onClick={handleBecomeVendor}
              className="bg-vaikunta-gold hover:bg-vaikunta-gold/90 text-white"
            >
              Become a Vendor
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
