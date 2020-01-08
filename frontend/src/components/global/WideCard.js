import React from 'react'
import './WideCard.css'
import '../../resources/fontawesome/all.js'

function WideCard(props) {
  const imgStyle = {
    backgroundImage: `url(${props.image})`
  };

  if(props.alignment === 'left') {
    return (
      <div className="widecard-container left">
        <div className="widecard left">
          <div className="widecard-grid left">
            <div className="widecard-image" style={imgStyle}>
            </div>
            
            <div className="widecard-body">
              <p className="widecard-title"> {props.title} </p>
              <p className="widecard-text"> {props.text} </p>
            </div>
          </div>
        </div>
      </div>
    )
  } else if(props.alignment === 'right') {
    return (
      <div className="widecard-container right">
        <div className="widecard right">
          <div className="widecard-grid right">
            <div className="widecard-image" style={imgStyle}>
            </div>
            
            <div className="widecard-body">
              <p className="widecard-title"> {props.title} </p>
              <p className="widecard-text"> {props.text} </p>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default WideCard