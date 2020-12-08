/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import './styles/index.scss';
// eslint-disable-next-line import/no-named-as-default-member
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider>
        <CSSReset />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
