import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from './Context/UserProvider';
import { UserContext } from "./Context/MyContext";
// Render the application with UserProvider
import OrderProvider from './Context/OrderProvider';
import ProductProvider from './Context/ProductProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
      <OrderProvider>
      <App/>
      </OrderProvider>
      </ProductProvider>
    </UserProvider>
    {/* <App/> */}
  </React.StrictMode>
  
);