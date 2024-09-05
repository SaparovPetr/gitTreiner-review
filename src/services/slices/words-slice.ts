import { createSlice } from '@reduxjs/toolkit';
import { TOneWord } from '@utils-types';

import { fetchCollection, addIdToEachWord } from '../thunks/thunk';

const uuid = require('uuid');

interface arrayState {
  collection: TOneWord[];
}

const initialState: arrayState = {
  collection: []
};

export const wordsSlice = createSlice({
  name: 'collection-slice',
  initialState,
  reducers: {
    removeWord(state, action) {
      state.collection = state.collection.filter(
        (word) => word.id !== action.payload.id
      );
    }
  },

  selectors: {
    /** селлектор Коллекции */
    selectCollection: (sliceState) => sliceState.collection,
    /** Рабочий элемент Коллекции  */
    selectFirstWord: (sliceState) => sliceState.collection[0]
  },

  extraReducers: (builder) => {
    builder
      // (заметка № 4)
      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.collection = action.payload;
      })
      // (заметка № 5)
      .addCase(addIdToEachWord.fulfilled, (state) => {
        state.collection.forEach((element) => {
          element.id = uuid.v4();
        });
      });
  }
});

export const { removeWord } = wordsSlice.actions;
export const { selectCollection, selectFirstWord } = wordsSlice.selectors;
