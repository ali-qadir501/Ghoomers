import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Guide, Destination, Booking, FEATURED_GUIDES, DESTINATIONS } from '../lib/utils';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  guides: Guide[];
  setGuides: (guides: Guide[]) => void;
  isGuidesLoading: boolean;
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
  isDestinationsLoading: boolean;
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  isBookingsLoading: boolean;
  refreshGuides: () => Promise<void>;
  refreshDestinations: () => Promise<void>;
  refreshBookings: () => Promise<void>;
  isAuthLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  const [isGuidesLoading, setIsGuidesLoading] = useState(true);
  const [isDestinationsLoading, setIsDestinationsLoading] = useState(true);
  const [isBookingsLoading, setIsBookingsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const refreshGuides = async () => {
    try {
      setIsGuidesLoading(true);
      const response = await fetch('/api/guides');
      if (response.ok) {
        const data = await response.json();
        setGuides(data.guides);
      } else {
        setGuides(FEATURED_GUIDES);
      }
    } catch (err) {
      console.error("Failed to fetch guides", err);
      setGuides(FEATURED_GUIDES);
    } finally {
      setIsGuidesLoading(false);
    }
  };

  const refreshDestinations = async () => {
    try {
      setIsDestinationsLoading(true);
      const response = await fetch('/api/destinations');
      if (response.ok) {
        const data = await response.json();
        setDestinations(data.destinations);
      } else {
        setDestinations(DESTINATIONS);
      }
    } catch (err) {
      console.error("Failed to fetch destinations", err);
      setDestinations(DESTINATIONS);
    } finally {
      setIsDestinationsLoading(false);
    }
  };

  const refreshBookings = async () => {
    if (!user) {
      setBookings([]);
      return;
    }
    try {
      setIsBookingsLoading(true);
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setIsBookingsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsAuthLoading(true);
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setIsAuthLoading(false);
      }
    };
    checkAuth();
    refreshGuides();
    refreshDestinations();
  }, []);

  useEffect(() => {
    if (user) {
      refreshBookings();
    } else {
      setBookings([]);
    }
  }, [user]);

  return (
    <AppContext.Provider value={{
      user, setUser,
      guides, setGuides, isGuidesLoading,
      destinations, setDestinations, isDestinationsLoading,
      bookings, setBookings, isBookingsLoading,
      refreshGuides, refreshDestinations, refreshBookings,
      isAuthLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
