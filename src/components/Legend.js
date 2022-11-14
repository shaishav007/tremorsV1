import React from 'react'
import "./styles/Legend.css"

const Legend = () => {
  return (
    <div className='legend'>
        <h3>Legend</h3>
        <p> 200 earthquakes found</p>
        <ul className='legendUl'>
            <li>Magnitude</li>
            <li>
                <div>
                <span className="colorbox upto3">  </span>less than 3
                </div>
            </li>
            <li>
                <div>
                <span className="colorbox threeTo6"></span>3-6
                </div>
            </li>
            <li>
                <div>
                <span className="colorbox sixTo7"></span>6-7
                </div>
            </li>
            <li>
                <div>
                <span className="colorbox above7"></span>7 and above
                </div>
            </li>

        </ul>
    </div>
  )
}

export default Legend