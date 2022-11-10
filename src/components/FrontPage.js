import React from 'react'
import "../components/styles/FrontPage.css"
import star from "../components/Assets/Images/star.png"

import { Link } from 'react-router-dom'

const FrontPage=()=> {
  return (
    <div className="frontPage">
      <figure className='frontPageStar'>  
          <img src={star} alt=""></img>
          <div className='frontPageTitles'>
            <h1> Tremors</h1>
            <h2>The international earthquake database</h2>
            <Link to="/mapPage">
              <div className='frontPageButtons frontPageBackgroundOne highlights'>
                See who saved the day !
              </div>  
            </Link>
            <Link to="/about">
              <div className='frontPageButtons frontPageBackgroundTwo highlights'> 
                  Meet the Makers!
              </div>
            </Link>
          </div>
        </figure>
    </div>
            
        

    
    
  )
}

export default FrontPage