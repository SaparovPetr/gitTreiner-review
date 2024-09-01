import { createSlice } from '@reduxjs/toolkit';
import { AppMode } from '@utils-types';

interface ImodeState {
  mode: AppMode;
}

const initialState: ImodeState = {
  mode: AppMode.Dif
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    /**установка режима приложения и его запись в  localStorage*/
    setMode(state, action) {
      state.mode = action.payload;
      // (заметка № 16)
      localStorage.setItem(`currientMode`, `${state.mode}`);
    }
  },
  selectors: {
    selectModeState: (sliceState) => sliceState.mode
  }
});

export const { setMode } = modeSlice.actions;
export const { selectModeState } = modeSlice.selectors;
