import React from 'react'
import "../components/styles/FrontPage.css"

import { Link } from 'react-router-dom'
import Footer from './Footer'

const FrontPage=()=> {
  return (
    <>
    <div className="frontPage">
      <figure className='frontPageStar' >  
          {/* <img src={star} alt=""></img> */}
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
    <Footer/>  
    </>
        

    
    
  )
}

export default FrontPage