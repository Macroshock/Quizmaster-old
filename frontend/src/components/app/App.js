import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Pages
import Navbar from '../navbar/Navbar.js';
import Home from '../pages/home/Home.js';
import About from '../pages/about/About.js';

import './App.css';

function App() {
  return (
    <Router>
        <Navbar/>

        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
    </Router>
  );
}

export default App;
