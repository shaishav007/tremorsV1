import React from 'react'
import { useState } from 'react';
const HeroStats = (props) => {
    const [index,setIndex]=useState(0);
    const heros=['geology teachers','Rich Mortal','Strong Good']
    // props.heroData = {
    
    //     'Rich Mortal':{
    //         incidents:[{
    //           eventId:'abcd',
    //           mag:5.5 ,
    //           description:'italy' 
    //         }],
    //         resolved:1,
    //         vacation:0,
    //     },
    //     'Strong Good':{
    //         incidents:[{
    //             eventId:'abcd',
    //             mag:5.5 ,
    //             description:'italy' 
    //           }],
    //           resolved:1,
    //           vacation:0,
    //     },
    //     'geology teachers':{
    //         incidents:[{
    //             eventId:'abcd',
    //             mag:5.5 ,
    //             description:'italy' 
    //           }],
    //           resolved:1,
    //           vacation:0,
    //     }
    // }

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
    <div>
        <div className='heroContainer'>
        <div className='heroImageContainer'>
            <img alt='subzero wins'/>
        </div>
        <p className='heroName' >{heros[index]} </p>
        <p className='incidents'>incidents:{props.heroData[`${heros[index]}`].resolved}</p>
        <p className='vacationsOwed'>vacations they are owed:{props.heroData[`${heros[index]}`].vacation}</p>
        </div>
        <div className='heroFooter'>
            <button className='left' onClick={changeIndex} name='previous'>left</button>
            <button className='madeBy'> Made by Dil, Tristan and Shaishav</button>
            <button className='right'onClick={changeIndex} name='next'>Right</button>
        </div>

    </div>
  )
}

export default HeroStats