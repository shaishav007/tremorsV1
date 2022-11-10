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
        <figure className='aboutImage '>
          <img src={faceImage} alt=""/>
          <div className='aboutImageBackground aboutImageOne'>
            <div className='aboutImageContent'> Shishav</div>
          </div>
        </figure>
        
        <figure className='aboutImage '>
        <img src={faceImage} alt=""/> 
        <div className='aboutImageBackground aboutImageTwo'>
          <div className='aboutImageContent'> 
        Dildeep
        </div>
        </div>
        
        </figure>
        <figure className='aboutImage '>
        <img src={faceImage} alt=""/>  
        <div className='aboutImageBackground aboutImageThree'>
          <div className='aboutImageContent'> 
        Tristan
        </div> 
        </div>
         
        </figure>
      </div>

    </div>  
  )
}

export default About