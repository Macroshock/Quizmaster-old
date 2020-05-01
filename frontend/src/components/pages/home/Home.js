import React from 'react'
import Card from '../../global/Card.js'
import WideCard from '../../global/WideCard.js'
import wideCardImage1 from '../../../resources/images/placeholder.png'

import './Home.css'

function Home () {

  return (
    <React.Fragment>
      <div className="image-container">
        <div className="main-image">
          <div className="header-container">
            <span className="header-text-title"> Want to make a quiz? </span>
            <span className="header-text-subtitle"> Deliver quizzes in a fast and simple way with QuizMaster </span>
            <button className="header-button-getstarted"> Get started </button>
          </div>
        </div>
      </div>
      
      <div className="main-section">
        <div className="main-section-header">
          <span className="main-section-title"> Create quizzes to... </span>
        </div>
        <div className="main-section-body">
          <Card text="Challenge students' knowledge" icon="fas fa-user-graduate"/>
          <Card text="Screen candidates for a job" icon="fas fa-tasks"/>
          <Card text="Gather data about an audience" icon="fas fa-chart-bar"/>
        </div>
      </div>

      <div className="secondary-section">
      <div className="secondary-section-header">
          <span className="secondary-section-title"> Here's how it works </span>
        </div>
        <WideCard 
        alignment="left"
        title="1. Create the quiz" 
        text="You can add as many questions as you want, and you can asign scores to each one." 
        image={wideCardImage1}/>
        <WideCard 
        alignment="right"
        title="2. Share the link" 
        text="People with access to the public link to your quiz will input their data and complete the quiz. They will get feedback
              on how well did they score in comparison with the others." 
        image={wideCardImage1}/>
        <WideCard 
        alignment="left"
        title="3. Watch the results!" 
        text="You will be able to view the results on how each person performed individually, but also on charts that will reflect
              the general performance on your quiz." 
        image={wideCardImage1}/>
      </div>

      <div className="footer">
        <span className="footer-text">Created by Santiago Tamashiro | Built using React | 2020</span>
      </div>
    </React.Fragment>
  )
}

export default Home
