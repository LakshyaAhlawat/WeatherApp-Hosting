// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cards: []
// };

// const weatherSlice = createSlice({
//   name: 'weather',
//   initialState,
//   reducers: {
//     addWeatherCard: (state, action) => {
//       state.cards.push(action.payload);
//     },
//     clearWeatherCards: (state) => {
//       state.cards = [];
//     }
//   }
// });

// export const { addWeatherCard, clearWeatherCards } = weatherSlice.actions;
// export default weatherSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: []
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeatherCard: (state, action) => {
      const newCard = action.payload;
      // Check if a card with the same city already exists (case-insensitive)
      const exists = state.cards.some(
        (card) => card.city.toLowerCase() === newCard.city.toLowerCase()
      );
      if (!exists) {
        state.cards.push(newCard);
      }
    },
    clearWeatherCards: (state) => {
      state.cards = [];
    }
  }
});

export const { addWeatherCard, clearWeatherCards } = weatherSlice.actions;
export default weatherSlice.reducer;


