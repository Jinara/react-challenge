import { createSlice } from '@reduxjs/toolkit';

import elements from '../elements.json';

const initialState = {
  elements: elements.elements.map((elem) => elem.symbol),
  currentElement: '',
  matches: [],
};

// Filters
// const THERE_IS_A_MATCH = 'matcher/match';
// const THERE_IS_NOT_A_MATCH = 'matcher/notAMatch';

export const matcherSlice = createSlice({
  name: 'matcher',
  initialState,
  reducers: {
    match: (state = initialState, action = {}) => {
      const allMatches = state.matches.concat(action.payload);
      return { ...state, matches: allMatches };
    },
    notAMatch: (state = initialState) => (state),
  },
});

export const { match, notAMatch } = matcherSlice.actions;

export const highlightAction = (word, element) => (dispatch) => {
  const regex = new RegExp(element);
  const matchIt = word.match(regex);
  if (matchIt) {
    console.log(matchIt);
    dispatch(match([element]));
  } else {
    dispatch(notAMatch([]));
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMatches = (store) => store.matchReducer.matches;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// thunk
export const matcherAll = (word) => (dispatch, state) => {
  const els = state().matchReducer.elements || [];
  els.forEach((element) => dispatch(highlightAction(word, element)));
};

export default matcherSlice.reducer;
