import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Breakify from './components/Breakify';

function App() {
  return (
    <Provider store={store}>
      <Breakify />
    </Provider>
  );
}

export default App;
