import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputs: [],
};

export const inputsBuilderSlice = createSlice({
  name: 'inputsBuilder',
  initialState,
  reducers: {
    addInput: (state = initialState, action = {}) => {
      console.log('holi :3', action, state);
      const allInputs = [...new Set([...state.inputs, action.payload])];
      const cleanedInputs = (array) => (
        [...new Set(array)]
      );

      console.log('inputs:', cleanedInputs(allInputs));
      state.inputs = allInputs;
    },
  },
});

export const {
  addInput,
} = inputsBuilderSlice.actions;

export const selectInputs = (store) => store.inputsBuilderSlice.inputs;

export default inputsBuilderSlice.reducer;
