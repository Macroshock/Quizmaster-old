import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { withRouter } from "react-router"
import Modal from '../global/Modal.js'
import Backdrop from '../global/Backdrop.js'

import './Navbar.css'

class Navbar extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentItem: 'homeItem',
      activeModal: '',
      modalMessage: '',
    }
  }

  componentDidUpdate(prevProps) {
    const currLocation = this.props.location

    if (currLocation !== prevProps.location) {
      let currPath = currLocation.pathname.slice(1, currLocation.pathname.length)

      this.setState(state => ({
        currentItem: currPath + 'Item'
      }))
    }
  }

  openModal = (modal) => {
    this.setState({
      activeModal: modal
    })
  }

  loginModalConfirm = () => {

    this.setState({
      modalMessage: ''
    })

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword
      })
    }).then(async res => {
      let data = await res.json()

      if (res.ok) {
        this.setState({
          activeModal: '',
          modalMessage: ''
        })
      } else if (data.message) {
        this.setState({
          modalMessage: data.message
        }) 
      } else {
        this.setState({
          modalMessage: 'Input is not valid.'
        }) 
      }
    }).catch(err => {
      this.setState({
        modalMessage: 'Server is not responding.'
      }) 
    })
  }

  signupModalConfirm = () => {
    this.setState({
      activeModal: ''
    })
  }

  modalCancel = () => {
    this.setState({
      activeModal: '',
      modalMessage: ''
    })
  }

  inputOnChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <React.Fragment>

        {(this.state.activeModal === 'Log In' || this.state.activeModal === 'Sign Up') && <Backdrop/>}
        {this.state.activeModal === 'Log In' && <Modal title="Log In" 
          canConfirm canCancel onConfirm={this.loginModalConfirm} onCancel={this.modalCancel}>
          <form className="form-login">
            <div>
              <label htmlFor="login-input-email">Email</label>
              <input id="login-input-email" name="loginEmail" type="email" onChange={this.inputOnChange}></input>
            </div>
            <div>
              <label htmlFor="login-input-password">Password</label>
              <input id="login-input-password" name="loginPassword" type="password" onChange={this.inputOnChange}></input>
            </div>
            <p className="message error">{this.state.modalMessage}</p>
          </form>
        </Modal>}
        {this.state.activeModal === 'Sign Up' && <Modal title="Sign Up" 
          canConfirm canCancel onConfirm={this.signupModalConfirm} onCancel={this.modalCancel}>
          <form className="form-signup">
            <div>
              <label htmlFor="signup-input-name">Name</label>
              <input id="signup-input-name" name="signupName" type="text" onChange={this.inputOnChange}></input>
            </div>
            <div>
              <label htmlFor="signup-input-email">Email</label>
              <input id="signup-input-email" name="signupEmail" type="email" onChange={this.inputOnChange}></input>
            </div>
            <div>
              <label htmlFor="signup-input-password">Password</label>
              <input id="signup-input-password" name="signupPassword" type="password" onChange={this.inputOnChange}></input>
            </div>
            <p className="message error">{this.state.modalMessage}</p>
          </form>
        </Modal>}

        <div className="navbar">
          <div className='navbar-flex-container'>
            <div className="navbar-logo">
              QuizMaster
            </div>
            <Link className={this.state.currentItem === "homeItem" ? "navbar-item active" : "navbar-item"} 
              to="/" id="homeItem" >
                Home
            </Link>

            <Link className={this.state.currentItem === "aboutItem" ? "navbar-item active" : "navbar-item"}
              to="/about" id="aboutItem">
                About
            </Link>

            <div className="navbar-item" onClick={() => this.openModal('Log In')}>
              Log In
            </div>

            <div className="navbar-item" onClick={() => this.openModal('Sign Up')}>
              Sign Up
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default withRouter(Navbar)
