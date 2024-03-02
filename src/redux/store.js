import { configureStore } from '@reduxjs/toolkit';

import matcherReducer from './matcherSlice';

export default configureStore({
  reducer: {
    matcherReducer,
  },
});
