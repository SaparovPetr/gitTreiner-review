import { createSlice } from '@reduxjs/toolkit';

interface ImodalState {
  showModal: boolean;
}

const initialState: ImodalState = {
  showModal: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    /** установка булевого состояния модалки */
    setShowModal(state, action) {
      state.showModal = action.payload;
    }
  },
  selectors: {
    selectModalState: (sliceState) => sliceState.showModal
  }
});

export const { setShowModal } = modalSlice.actions;
export const { selectModalState } = modalSlice.selectors;
