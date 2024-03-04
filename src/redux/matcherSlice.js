import { createSlice } from '@reduxjs/toolkit';

import elements from '../elements.json';

/*
  TODO: Move this to a elementsSlice and use the store to inject the elements as a dependency
*/
const computeRegexBuild = () => {
  const elementsString = elements.elements.reduce((acc, elem) => {
    if (elem.symbol.length >= 2) {
      const newAcc = acc + elem.symbol;
      return `${newAcc}|`;
    }
    return acc;
  }, '');
  return `^(?:${elementsString}\b)`;
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
    anyMatchFound: (state = initialState, action = {}) => {
      const emptyMatch = { word: action.payload };
      const allWords = [...new Set([...state.words, emptyMatch])];
      state.words = allWords;
    },
    emptyWords: (state = initialState) => {
      state.words = [];
    },
  },
});

export const {
  matchFound, emptyWords, updateWords, anyMatchFound,
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
    } else {
      dispatch(anyMatchFound(word));
    }
  };
}

export const selectWords = (store) => store.matcherReducer.words;

export default matcherSlice.reducer;
