import React from 'react'

import { Link } from 'react-router-dom'

const FrontPage=()=> {
  return (
    <div>
        <h1> Tremors or ResCue</h1>
        <Link to="/mapPage">
            <button>See who saved the day</button>
        </Link>
        <Link to="/about">
            <button>Meet the Makers!`</button>
        </Link>

    </div>
    
  )
}

export default FrontPage