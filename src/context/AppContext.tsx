
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from '../data/dummyData';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'user' | 'vendor';
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  isLoginModalOpen: boolean;
  isCartOpen: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_LOGIN_MODAL' }
  | { type: 'TOGGLE_CART' };

const initialState: AppState = {
  user: null,
  cart: [],
  isLoginModalOpen: false,
  isCartOpen: false
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload], isCartOpen: true };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_LOGIN_MODAL':
      return { ...state, isLoginModalOpen: !state.isLoginModalOpen };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
