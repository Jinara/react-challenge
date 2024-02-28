import React from 'react';
import { Provider } from 'react-redux';

// import Elements from './components/elements';
import store from './redux/store';
import Matcher from './components/matcher';

function App() {
  return (
    <Provider store={store}>
      <Matcher />
    </Provider>
  );
}

export default App;
