import React from 'react'
import { useState} from 'react';
import { Link } from 'react-router-dom';
import './styles/HeroStats.css'
import strongGood from './Assets/Images/strongGood.jpg'

const HeroStats = (props) => {
    const [index,setIndex]=useState(0);
    const heros=['geology teachers','Rich Mortal','Strong Good']

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
            <div className='heroImageContainer'>
                <img src={strongGood}alt='silhouette of geology teachers or the hero sent to save us from the earthquaker'/>
            </div>
            <div className="heroIncidents">
                <p className='heroName' >{heros[index]} </p>
                <p className='incidents'>incidents:{props.heroData[`${heros[index]}`].resolved}</p>
                <p className='vacationsOwed'>vacations they are owed:{props.heroData[`${heros[index]}`].vacation}</p>
            </div>
        </div>
        <div className='heroFooter'>
            <button className='left' onClick={changeIndex} name='previous'>left</button>
            <button className='right'onClick={changeIndex} name='next'>Right</button>
            <Link to='/about' class="aboutLink"><button className='madeBy'> Made by Dil, Tristan and Shaishav</button></Link>
        </div>
    </div>
  )
}

export default HeroStats