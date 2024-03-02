import { createSlice } from '@reduxjs/toolkit';

import elements from '../elements.json';

const initialState = {
  elements: elements.elements.map((elem) => elem.symbol),
  matches: [],
  word: '',
  aMatch: false,
};

export const matcherSlice = createSlice({
  name: 'matcher',
  initialState,
  reducers: {
    updateWord: (state = initialState, action = {}) => {
      state.word = action.payload;
    },
    isAMatch: (state = initialState, action = {}) => {
      const allMatches = [...new Set([...state.matches, ...action.payload])];
      console.log('match:', allMatches);
      state.matches = allMatches;
      state.aMatch = true;
    },
    notAMatch: (state = initialState, action = {}) => {
      const allMatches = [...new Set([...state.matches, ...action.payload])];
      state.matches = allMatches;
    },
    emptyWord: (state = initialState) => { state.matches = []; },
  },
});

export const {
  isAMatch, notAMatch, emptyWord, updateWord,
} = matcherSlice.actions;

export function highlightThunk(word) {
  return async function ajaWordThunk(dispatch, getState) {
    getState().matcherReducer.elements.forEach((element) => {
      const regex = new RegExp(element, 'i');
      const matchIt = word.match(regex);
      if (matchIt) {
        console.log(matchIt, 'retornando', element);
        dispatch(isAMatch([element]));
      }
    });
  };
}

export const selectMatches = (store) => store.matcherReducer.matches;

export default matcherSlice.reducer;
