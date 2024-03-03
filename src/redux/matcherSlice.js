import { createSlice } from '@reduxjs/toolkit';

import elements from '../elements.json';

const computeRegexBuild = () => {
  const elementsString = elements.elements.reduce((acc, elem) => {
    if (elem.symbol.length >= 2) {
      const newAcc = acc + elem.symbol;
      return `${newAcc}|`;
    }
    return acc;
  }, '');
  return `(?:${elementsString}\b)`;
};

const initialState = {
  words: [],
};

export const matcherSlice = createSlice({
  name: 'matcher',
  initialState,
  reducers: {
    updateWords: (state = initialState, action = {}) => {
      state.words = action.payload;
    },
    matchFound: (state = initialState, action = {}) => {
      const allWords = [...new Set([...state.words, action.payload])];
      state.words = allWords;
    },
    emptyWords: (state = initialState) => {
      state.words = [];
    },
  },
});

export const {
  matchFound, emptyWords, updateWords,
} = matcherSlice.actions;

export function highlightFirstMatch(word) {
  return async function thunk(dispatch) {
    const regex = new RegExp(computeRegexBuild(), 'g');
    const matchIt = word.match(regex);
    if (matchIt) {
      const payload = {
        word,
        match: matchIt[0],
      };
      dispatch(matchFound(payload));
    }
  };
}

export const selectWords = (store) => store.matcherReducer.words;

export default matcherSlice.reducer;
