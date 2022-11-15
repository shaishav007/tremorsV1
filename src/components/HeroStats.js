import React from 'react'
import { useState} from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import './styles/HeroStats.css'
import richMortal from './Assets/Images/richMortal.jpg'
import geologyTeachers from './Assets/Images/geologyTeacher.png'
import strongGood from './Assets/Images/strongGood.jpg'

const HeroStats = (props) => {
    const [index,setIndex]=useState(0);
    const heros=['geology teachers','Rich Mortal','Strong Good']
    const heroImages=[ geologyTeachers, richMortal ,strongGood]

    const changeIndex=(e)=>{
        let updatedIndex=0;
        if(e.target.name==='previous'){
            updatedIndex = index-1;
            if(updatedIndex===-1){
                updatedIndex=2;
            }
        }
        if(e.target.name==='next'){
            updatedIndex=index+1;
            
        }
        setIndex(updatedIndex%3);
    }
  return (
    <div className='heroStats'>    
        <div className='heroContainer'>
            <div className='OnlyShowOnTablet'>
                <button className='left' onClick={changeIndex} name='previous'>left</button>
            </div>
            <div className='heroImageContainer'>
                <img src={heroImages[index]}alt='silhouette of geology teachers or the hero sent to save us from the earthquake'/>
            </div>
            <div className="heroIncidents">
                <Typewriter
                    options={{
                        strings: [`${heros[index]}`, `Present for ${props.heroData[`${heros[index]}`].resolved} incidents`, `Vacation time owed:${props.heroData[`${heros[index]}`].vacation} days`],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
            <div className='OnlyShowOnTablet tabletRight'>
                <button className='right'onClick={changeIndex} name='next'>Right</button>
            </div>
        </div>
        <div className='heroFooter tabletHidden'>
            <button className='left' onClick={changeIndex} name='previous'>left</button>
            <button className='right' onClick={changeIndex} name='next'>Right</button>
            <Link to='/about' className="aboutLink"><button className='madeBy'> Made by Dil, Tristan and Shaishav</button></Link>
        </div>    
    </div>
  )
}

export default HeroStats