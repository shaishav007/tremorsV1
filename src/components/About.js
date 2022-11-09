import React from 'react'
import "../components/styles/About.css"
import faceImage from "../components/Assets/Images/random.jpg"

const About = () => {
  return (
    <div className='about'>
      <div className='aboutInstructions'>
        Instructions
      </div>
      <div className='aboutImageWrapper'>
        <figure className='aboutImage aboutImageOne'>
          <img src={faceImage} alt=""/>
        </figure>
        <figure className='aboutImage aboutImageTwo'>
        <img src={faceImage} alt=""/> 
        </figure>
        <figure className='aboutImage aboutImageThree'>
        <img src={faceImage} alt=""/>    
        </figure>
      </div>

    </div>  
  )
}

export default About