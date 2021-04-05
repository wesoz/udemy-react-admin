import React from 'react';
import './App.css';
import Users from './pages/Users';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={Dashboard}/>
        <Route path={'/users'} component={Users}/>
        <Route path={'/register'} component={Register}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
