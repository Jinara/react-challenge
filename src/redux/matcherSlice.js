import { createSlice } from '@reduxjs/toolkit';

import elements from '../elements.json';

const initialState = {
  elements: elements.elements.map((elem) => elem.symbol),
  matches: [],
  loading: false,
  word: '',
  aMatch: false,
};

// export const highlightThunk = createAsyncThunk('matcher/highlight', async (word) => {
//   await initialState.elements.forEach((element) => {
//     const regex = new RegExp(element, 'i');
//     const matchIt = word.match(regex);
//     if (matchIt) {
//       console.log(matchIt, 'retornando', element);
//       return [element];
//     }
//     console.log('no match retornando vacio');
//     return [];
//   });
// });

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(highlightThunk.fulfilled, (state, action) => {
  //       console.log('guligli', state, action);
  //       // const allMatches = [...new Set([...state.matches, ...action.payload])];
  //       // console.log('fulfilled', allMatches);
  //       // return { ...state, matches: allMatches };
  //       state.matches = [...new Set([...state.matches, ...action.payload])];
  //     })
  //     .addCase(highlightThunk.pending, (state, action) => {
  //       console.log('loading', state, action);
  //       state.loading = true;
  //     })
  //     .addCase(highlightThunk.rejected, (state, action) => {
  //       console.log('rejected', state, action);
  //       state.loading = false;
  //     });
  // },
});

export const {
  isAMatch, notAMatch, emptyWord, updateWord,
} = matcherSlice.actions;

// ajaWordThunk is the "thunk action creator"
export function ajaThunk(word) {
  // fetchTodoByIdThunk is the "thunk function"
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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// thunk
// export const matcherAll = (word) => async (dispatch, state) => {
//   const els = state().matchReducer.elements || [];
//   await els.forEach((element) => dispatch(highlightAction(word, element)));
// };

export default matcherSlice.reducer;
