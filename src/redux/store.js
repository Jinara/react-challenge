import { configureStore } from '@reduxjs/toolkit';

import matcherReducer from './matcherSlice';
// import inputsBuilderSlice from './inputsBuilderSlice';

export default configureStore({
  reducer: {
    matcherReducer,
    // inputsBuilderSlice,
  },
});
