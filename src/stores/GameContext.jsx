import { create } from "zustand";

const API = process.env.REACT_APP_TAG_API;

export const useGameStore = create((set) => ({
    fullDeck: [],



    reset: () => {
        set({
            fullDeck: []
        });
    },
    
    createTags: async (tags) => {
        set({ fullDeck: [] });
       
    },
    
}));
