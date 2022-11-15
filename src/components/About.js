import React from 'react'
import "../components/styles/About.css"
import faceImage from "../components/Assets/Images/random.jpg"
import Footer from './Footer'
import arrow from "../components/Assets/Images/arrow.png"
import { Link } from 'react-router-dom'


const About = () => {
  return (<>
    <div className='about'>
      <div className='aboutH1Logo'>
        <Link exact to="/">
        <figure className='aboutLogo'>
          <img src={arrow} alt="arrow to home"></img>
        </figure>
        </Link>
        <h1 className='aboutUs'>
          about us
        </h1>
      </div>
      <div className='aboutImageWrapper'>
        <figure className='aboutImage '>
          <img src={faceImage} alt=""/>
          <div className='aboutImageBackground aboutImageOne'>
            <div className='aboutImageContent'> 
            <p><a className='aboutBlack' href="https://Shaishav.ca" target="_blank" rel="noreferrer"> Shaishav Vashi</a></p>
            <p><a className='aboutBlack' href="https://www.linkedin.com/in/shaishavvashi/" target="_blank" rel="noreferrer"> Linkedin</a></p>
            <p><a className='aboutBlack' href="https://github.com/shaishav007" target="_blank" rel="noreferrer"> Github</a></p>
            
            
            </div>
          </div>
        </figure>
        
        <figure className='aboutImage '>
        <img src={faceImage} alt=""/> 
        <div className='aboutImageBackground aboutImageTwo'>
          <div className='aboutImageContent'> 
          <p>
            <a className='aboutBlack' href="https://dildeepgill.com" target="_blank" rel="noreferrer"> Dildeep Gill</a>
          </p>  
          <p><a  className='aboutBlack'href="https://www.linkedin.com/in/dildeep-gill-74436214a/" target="_blank" rel="noreferrer"> Linkedin</a></p>
          <p><a  className='aboutBlack'href="https://github.com/dildeepgill" target="_blank" rel="noreferrer"> Github</a></p>
          

        </div>
        </div>
        
        </figure>
        <figure className='aboutImage '>
        <img src={faceImage} alt=""/>  
        <div className='aboutImageBackground aboutImageThree'>
          <div className='aboutImageContent'> 
          <p><a className='aboutBlack'href="https://Tristanthorburn.com" target="_blank" rel="noreferrer">Tristan Thorburn</a></p>
          <p><a  className='aboutBlack'href="https://www.linkedin.com/in/tristanthorburn/" target="_blank" rel="noreferrer"> Linkedin</a></p>
          <p><a  className='aboutBlack'href="https://github.com/TristanThorburn" target="_blank" rel="noreferrer"> Github</a></p>
        </div> 
        </div>
        </figure>
        
      </div>
      <div className='aboutProject'>
          <h3 className='aboutProjectHeader'>About Our Project</h3>
          <p className='aboutProjectPara'>Tremors: Earthquake Detection App
            Developed a front-end web app using React Leaflet and USGS APIs to plot
            earthquakes on a vector map, assign heroes, and log vacation days to Firebase.
            Technologies utilized: HTML | CSS | JavaScript | React (Hooks & Routing) | Firebase | APIs
            </p>
        </div>

    </div>  
    <Footer/>

    </>
  
  )
}

export default About