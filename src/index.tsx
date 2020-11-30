import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.scss';
import { Provider } from 'react-redux';
=======
import './styles/index.scss';
>>>>>>> f78bbc2e8b42161b4146d806624ff29250ebc62a
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store/configStore';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
