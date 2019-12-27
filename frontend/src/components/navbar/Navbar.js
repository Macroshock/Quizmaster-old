import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import './Navbar.css';

class Navbar extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      currentItem: "homeItem"
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

  render() {
    return (
      <div className="navbar">
        <Link className={this.state.currentItem === "homeItem" ? "navbar-item active" : "navbar-item"} 
          to="/" id="homeItem" >
            Home
        </Link>

        <Link className={this.state.currentItem === "aboutItem" ? "navbar-item active" : "navbar-item"}
           to="/about" id="aboutItem">
             About
        </Link>

        <div className="navbar-item">
          Log In
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar);