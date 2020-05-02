import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router"
import LogInModal from './LogInModal.js'
import SignUpModal from './SignUpModal.js'

import './Navbar.css'

function Navbar(props) {

  const [navbarItem, setNavbarItem] = useState('homeItem')
  const [logInModalActive, setLogInModalActive] = useState(false)
  const [signUpModalActive, setSignUpModalActive] = useState(false)

  useEffect(() => {
    const currLocation = props.location
    let currPath = currLocation.pathname.slice(1, currLocation.pathname.length)

    setNavbarItem(currPath + 'Item')
  }, [props.location])

  const logInModalCancel = useCallback(() => {
    setLogInModalActive(false)
  })

  const signUpModalCancel = useCallback(() => {
    setSignUpModalActive(false)
  })

  return (
    <React.Fragment>
      <LogInModal isActive={logInModalActive} onCancel={logInModalCancel}/>
      <SignUpModal isActive={signUpModalActive} onCancel={signUpModalCancel}/>

      <div className="navbar">
        <div className='navbar-flex-container'>
          <div className="navbar-logo">
            QuizMaster
          </div>
          <Link className={navbarItem === "homeItem" ? "navbar-item active" : "navbar-item"} 
            to="/home" id="homeItem" >
              Home
          </Link>

          <Link className={navbarItem === "aboutItem" ? "navbar-item active" : "navbar-item"}
            to="/about" id="aboutItem">
              About
          </Link>

          <div className="navbar-item" onClick={() => setLogInModalActive(true)}>
            Log In
          </div>

          <div className="navbar-item" onClick={() => setSignUpModalActive(true)}>
            Sign Up
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Navbar)
