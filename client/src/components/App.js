import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './main pages/homepage/Home'
import Login from './user pages/Login';
import RegisterPage from './user pages/Register';
import authWrapper from './hoc/auth';
import Navbar from './main pages/navbar/Navbar';
import UploadProductPage from './product pages/UploadProductPage';
import 'antd/dist/antd.css';
import ProductDetails from './product pages/product details/ProductDetails';
import CartPage from './main pages/cartpage/CartPage';

function App() {

  // null - anyone can access
  // true - needs to login
  // false - needs to logout
  
  return (
    
    <Suspense fallback={(<div>Loading...</div>) }>
      <Navbar />
      <Switch>
        <Route exact path = '/' component={authWrapper(Home, true)} />
        <Route path = '/login' component={authWrapper(Login, false)} />
        <Route path = '/register' component={authWrapper(RegisterPage, false)} />
        <Route path = '/products/upload' component={authWrapper(UploadProductPage, true)} />
        <Route path = '/products/:id' component={authWrapper(ProductDetails, true)} />
        <Route path = '/user/cart' component={authWrapper(CartPage, true)} />
      </Switch>
    </Suspense>
  );
}
export default App;