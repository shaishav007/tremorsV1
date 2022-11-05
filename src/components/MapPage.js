import axios from 'axios';

import React, { useEffect, useState } from 'react'

import InputFormComponent from './InputFormComponent'
import DisplayMap from './DisplayMap';
import MyComponent from  './DisplayMap'
const MapPage = () => {
//state to get data from the input form // an object which is just place, magnitude, ....
const [userChoices,setUserChoices] = useState({});
const [hasUserChosen,setHasUserChosen]=useState(false);

useEffect(()=>{
    //make the final api call here so that we can get the stuff ready also refresh the map logic 
    if(userChoices.min!==undefined){
       
       setHasUserChosen(true);
       //so we have tested the map, lets run our original api

       axios({
           url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
           params:{
               format:'geojson',
               latitude:userChoices.latitude,
               longitude:userChoices.longitude,
               maxradiuskm:50,
               starttime:userChoices.startDate,
               endtime:userChoices.endDate,
               minmagnitude:userChoices.min,
               maxmagnitude:userChoices.max
           }
   
       }).then((res)=>{
           console.log(res.data);
       }).catch((err)=>{
           console.log(err);
       });
    }

},[userChoices]);

  return (
    <div>
        <InputFormComponent getFinalQuery= {setUserChoices}/>
{/* if user has chosen then just put the fucking map on the table */}   {
        hasUserChosen?
        <DisplayMap latitude={userChoices.latitude} longitude={userChoices.longitude}/>
       
        :<>Try filling the form up</>
        }
    </div>
  )
}

export default MapPage