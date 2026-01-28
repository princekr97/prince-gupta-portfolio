import { create } from 'zustand';

interface NavigationState {
    activeSection: string;
    setActiveSection: (section: string) => void;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    setIsMenuOpen: (isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    activeSection: 'hero',
    setActiveSection: (section) => set({ activeSection: section }),
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));
