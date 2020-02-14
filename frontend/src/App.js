import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './components/reducers';
import logo from './logo.svg';
import './App.css';
import Blog from './components/Blog';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Blog />
    </Provider>
  );
}

export default App;
