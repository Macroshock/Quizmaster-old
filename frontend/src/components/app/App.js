import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

// Pages
import Navbar from '../navbar/Navbar.js'
import Home from '../pages/home/Home.js'
import About from '../pages/about/About.js'

import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Navbar/>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route> 
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About}/>
      </Router>
    )
  }
}

export default App
