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
  matches: [],
  word: '',
  words: [],
};

export const matcherSlice = createSlice({
  name: 'matcher',
  initialState,
  reducers: {
    updateWord: (state = initialState, action = {}) => {
      state.word = action.payload;
      const allWords = [...new Set([...state.words, ...action.payload])];
      state.words = allWords;
    },
    isAMatch: (state = initialState, action = {}) => {
      const allMatches = [...new Set([...state.matches, ...action.payload])];
      console.log('match:', allMatches);
      state.matches = allMatches;
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
  return async function thunk(dispatch) {
    const regex = new RegExp(computeRegexBuild(), 'g');
    const matchIt = word.match(regex);
    if (matchIt) {
      dispatch(isAMatch(matchIt));
    }
  };
}

export const selectMatches = (store) => store.matcherReducer.matches;

export default matcherSlice.reducer;
