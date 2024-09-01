import { createSlice } from '@reduxjs/toolkit';

import { currientDate } from '../../utils/currient-date';

interface ICounterState {
  effortCounter: number;
}

const initialState: ICounterState = {
  effortCounter: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /**установка счетчика и запись его значения в localStorage*/
    setCounter(state, action) {
      state.effortCounter = state.effortCounter + action.payload;
      // (заметка № 16)
      localStorage.setItem(
        `effortCounterInStorage-${currientDate}`,
        `${state.effortCounter}`
      );
    }
  }
});

export const { setCounter } = counterSlice.actions;
