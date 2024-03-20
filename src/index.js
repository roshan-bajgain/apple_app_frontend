import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productsSlice, { productsFetch } from './features/productsSlice';
import { productsApi } from './features/productApi';
import {cartReducer} from './features/cartSlice'

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware)=> {
   return getDefaultMiddleware().concat(productsApi.middleware)
  }
  
});

store.dispatch(productsFetch());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

