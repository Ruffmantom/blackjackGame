import { cards } from "../data/cards";
import { create } from "zustand";

// Assuming you have a createId function that generates a unique id
const createId = () => '_' + Math.random().toString(36).substr(2, 9);

export const useGameStore = create((set, get) => ({
  playableCards: [],
  burnedCards: [],
  playersHand: [],
  dealersHand: [],

  reset: () => {
    set({
      playableCards: [],
      burnedCards: [],
      playersHand: [],
      dealersHand: [],
    });
  },

  shuffleDecks: () => {
    let fullDeck = [];

    // Iterate 8 times for 8 decks
    for (let i = 0; i < 8; i++) {
      // Use map to add the id property to each card
      cards.forEach(card => {
        fullDeck.push({
          ...card,
          id: createId(),  // Add the new id property
        });
      });
    }

    // Shuffle
    for (let i = fullDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]];
    }

    // Another shuffle
    fullDeck.sort(() => Math.random() - 0.5);

    console.log('SHUFFLED DECK: ', fullDeck);

    // Update state with shuffled deck
    set({ playableCards: fullDeck });
  },

  burnCard: () => {
    set((state) => {
      const burnedCard = state.playableCards[0];
      const updatedPlayableCards = state.playableCards.slice(1); // Remove the first card
      const updatedBurnedCards = [...state.burnedCards, burnedCard];

      return {
        playableCards: updatedPlayableCards,
        burnedCards: updatedBurnedCards,
      };
    });
  },

  startGame: () => {
    set((state) => {
      const playersCard = state.playableCards[0]; // first card to player
      const updatedPlayableCards = state.playableCards.slice(1); // remove that card from deck

      return {
        playersHand: [...state.playersHand, playersCard], // add to player's hand
        playableCards: updatedPlayableCards, // update playable cards
      };
    });
  },
}));
