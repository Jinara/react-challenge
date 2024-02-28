import { configureStore } from '@reduxjs/toolkit';

// import periodicTableReducer from './periodicTableDucks';
// import matcherReducer from './matcherDucks';
import matcherReducer from './matcherSlice';

const reducers = {
  // elementsReducers: periodicTableReducer,
  // matchReducers: matcherReducer,
  matchReducer: matcherReducer,
};

export default configureStore({
  reducer: reducers,
});
