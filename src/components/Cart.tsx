
import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { X } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Cart = () => {
  const { state, dispatch } = useApp();
  
  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart"
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality coming soon!"
    });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Drawer open={state.isCartOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_CART' })}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold flex items-center justify-between">
            <span>Your Cart</span>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 py-2 overflow-y-auto max-h-[60vh]">
          {state.cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-vaikunta-charcoal/70">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.cart.map((item) => (
                <div 
                  key={item.id} 
                  className="border border-vaikunta-gold/20 rounded-lg p-4 bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-vaikunta-charcoal">{item.item.name}</h3>
                      <p className="text-sm text-vaikunta-charcoal/70 mt-1 capitalize">{item.type}</p>
                      
                      {item.details && (
                        <div className="mt-2 space-y-1">
                          {item.details.date && (
                            <p className="text-sm text-vaikunta-charcoal/70">
                              <span className="font-medium">Date:</span> {item.details.date}
                            </p>
                          )}
                          {item.details.time && (
                            <p className="text-sm text-vaikunta-charcoal/70">
                              <span className="font-medium">Time:</span> {item.details.time}
                            </p>
                          )}
                          {item.details.guests && (
                            <p className="text-sm text-vaikunta-charcoal/70">
                              <span className="font-medium">Guests:</span> {item.details.guests}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-vaikunta-gold">₹{item.price.toLocaleString()}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 mt-2 p-0 h-auto hover:text-red-700"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <DrawerFooter className="border-t border-vaikunta-gold/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-bold text-vaikunta-gold">₹{getTotalPrice().toLocaleString()}</span>
          </div>
          <Button 
            className="bg-vaikunta-gold hover:bg-vaikunta-gold/90 w-full"
            disabled={state.cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
