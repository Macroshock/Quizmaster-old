import React from 'react'
import './Card.css'
import '../../resources/fontawesome/all.js'

function Card(props) {
  return (
    <div className="card">
      {props.icon &&
        <div className="card-icon">
          <i className={props.icon}></i>
        </div>
      }
      <p> {props.text} </p>
    </div>
  )
}

export default Card