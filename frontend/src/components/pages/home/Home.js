import React from 'react'
import './Home.css'
import Card from '../../global/Card.js'

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
          <span className="main-section-title"> How does it work? </span>
          <span className="main-section-subtitle"> Here's how to deliver quizzes in 3 easy steps </span>
        </div>
        <div className="main-section-body">
          <Card text="text1" icon="fas fa-clipboard-list"/>
          <Card text="text2" icon="fas fa-tasks"/>
          <Card text="text3" icon="fas fa-chart-bar"/>
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