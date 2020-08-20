import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './main pages/Home'
import Login from './user pages/Login';
import RegisterPage from './user pages/Register';
import authWrapper from './hoc/auth';
import Navbar from './main pages/navbar/Navbar';


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
      </Switch>
    </Suspense>
  );
}
export default App;