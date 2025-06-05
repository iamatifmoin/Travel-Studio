
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Experience {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  image?: string;
  distance?: string;
  rating?: number;
  cuisine?: string;
  position?: { x: number; y: number; z: number };
  color?: string;
  coordinates?: { lat: number; lng: number };
  priceRange?: string;
}

interface StoreState {
  selectedExperience: Experience | null;
  selectedInternalRoom: number | null;
  selectedExternalRoom: number | null;
  internalExperiences: Experience[];
  externalExperiences: Experience[];
  isAuthenticated: boolean;
  isLoading: boolean;
  distanceFilter: string;
  ratingFilter: number;
  setSelectedExperience: (experience: Experience | null) => void;
  setSelectedInternalRoom: (roomId: number | null) => void;
  setSelectedExternalRoom: (roomId: number | null) => void;
  setExperiences: (internal: Experience[], external: Experience[]) => void;
  setAuthenticated: (auth: boolean) => void;
  setLoading: (loading: boolean) => void;
  setDistanceFilter: (filter: string) => void;
  setRatingFilter: (filter: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedExperience: null,
      selectedInternalRoom: null,
      selectedExternalRoom: null,
      internalExperiences: [],
      externalExperiences: [],
      isAuthenticated: false,
      isLoading: true,
      distanceFilter: 'all',
      ratingFilter: 0,
      setSelectedExperience: (experience) => set({ selectedExperience: experience }),
      setSelectedInternalRoom: (roomId) => set({ selectedInternalRoom: roomId }),
      setSelectedExternalRoom: (roomId) => set({ selectedExternalRoom: roomId }),
      setExperiences: (internal, external) => 
        set({ internalExperiences: internal, externalExperiences: external }),
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setLoading: (loading) => set({ isLoading: loading }),
      setDistanceFilter: (filter) => set({ distanceFilter: filter }),
      setRatingFilter: (filter) => set({ ratingFilter: filter }),
    }),
    {
      name: 'travel-studio-store',
      partialize: (state) => ({ 
        selectedExperience: state.selectedExperience,
        isAuthenticated: state.isAuthenticated,
        distanceFilter: state.distanceFilter,
        ratingFilter: state.ratingFilter,
      }),
    }
  )
);
