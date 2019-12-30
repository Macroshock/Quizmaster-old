import React from 'react'
import './Home.css'
import mainImage from '../../../resources/images/main-image.jpg'

function Home() {
  return (
    <React.Fragment>
      <div className="image-container">
        <div className="main-image">
          <div className="header-container">
            <span className="header-text-title"> Title </span>
            <span className="header-text-subtitle"> subtitle </span>
            <button className="header-button-getstarted"> Get started </button>
          </div>
        </div>
      </div>
      
      <div className="main-section">
        <div className="main-section-header">
          <span className="main-section-title"> Title </span>
          <span className="main-section-subtitle"> Subtitle </span>
        </div>
        <div className="main-section-body">
          <div className="main-section-card">
            text
          </div>
          <div className="main-section-card">
            text
          </div>
          <div className="main-section-card">
            text
          </div>
        </div>
      </div>

      <div className="secondary-section">
      <div className="secondary-section-header">
          <span className="secondary-section-title"> Title </span>
          <span className="secondary-section-subtitle"> Subtitle </span>
        </div>
        <p className="secondary-section-body">
          text
        </p>
      </div>

      <div className="footer">
        <span className="footer-text">text</span>
      </div>
    </React.Fragment>
  )
}

export default Home;