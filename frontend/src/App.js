import React from 'react';
import './App.css';
import Routing from './rautes';

import logo from './assets/logo.svg';

function App() {
  
  return (
    <div className = "container">
      <img src= {logo} alt="MyHostel"/> 
      <div className="content">
          <Routing/>
      </div>
      
    </div>
  );
}

export default App;
