import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './component/App';
import bingoReducer from './reducer';

// store 생성
const store = createStore(bingoReducer);

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;