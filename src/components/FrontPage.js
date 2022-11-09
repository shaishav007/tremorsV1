import React from 'react'
import "../components/styles/FrontPage.css"

import { Link } from 'react-router-dom'

const FrontPage=()=> {
  return (
    <div className="frontPage">
        <h1> Tremors</h1>
        <h2>The international earthquake database</h2>
        <Link to="/mapPage">
          <div className='frontPageButtonOne'>
            <button>See who saved the day</button>
          </div>  
        </Link>
        <Link to="/about">
        <div className='frontPageButtontwo'> 
            <button>Meet the Makers!`</button>
        </div>
            
        </Link>

    </div>
    
  )
}

export default FrontPage