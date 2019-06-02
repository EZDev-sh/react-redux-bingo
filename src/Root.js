import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './component/App';
import bingoReducer from './reducer';

const store = createStore(bingoReducer);
const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;