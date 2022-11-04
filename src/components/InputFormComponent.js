import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const InputFormComponent = (props) => {

    //lets add the states
    const [placeCoords,setPlaceCoords]=useState([]);
    const [minState,setMin]=useState(0);
    const [maxState,setMax]=useState(10);
    const [startDateState,setStartDate] = useState("2021-11-03");
    const [endDateState,setEndDate]= useState("2022-11-03")
    const [isDataIn,setIsDataIn]=useState(false);

//define the getPlaceQuery function
const getPlaceQuery=(e)=>{
 
    let location = e.target.value;
    //run the api call here and get something.
    axios({
        url:'https://api.geocodify.com/v2/geocode',
        params:{
          api_key:'d932e384a601c13eefe2d9926ebe5c44b867c22b',
          q:e.target.value
        }
      }).then((res)=>{
        //save the coordinates in this exact order otherwise it won't work
        const coords = res.data.response.features[0].geometry.coordinates;
        //set coords now - UPDATE STATE
        setPlaceCoords(coords);

        //justCozData is in
        setIsDataIn(true);
        //call this function once we get all the coords
        setEverythingUp();

      }).catch((err)=>{
        console.log(err)
      })
    
}

const getRangeQuery=(e)=>{
    //when e occurs we gotta see where it occured
    if(e.target.name==='minValue'){
        //user Set the minimum value here
        setMin(e.target.value)
    }else if(e.target.name==='maxValue'){
        setMax(e.target.value)
    }

    setEverythingUp();
}

const getDateQuery=(e)=>{
    if(e.target.name==='startDate'){
        setStartDate(e.target.value);
    }else if(e.target.name==='endDate'){
        setEndDate(e.target.value);
    }
    setEverythingUp();
}

//after all these we need to just add stuff to the array so that we can pass the values to the parent
const setEverythingUp=()=>{
    //only run if data is in
    if(isDataIn){
        //its supposed to generate a datastructure we can easily query
        const finalQuery={
            latitude:placeCoords[1],//make sure you don't mess this up else our marker is gonna end up in antarctica
            longitude:placeCoords[0],
            startDate:startDateState,
            endDate:endDateState,
            min:minState,
            max:maxState
        }
        //send all the data at once.
        props.getFinalQuery(finalQuery);
    }
}

  return (
    <div>
        <label htmlFor='place'>Enter the location</label>
        <input type="text" name='place' onKeyDown={getPlaceQuery}/>
        <label htmlFor='minValue'>Min</label>
        <input type="range" name='minValue' min="0" max="10" step="0.25" onChange={getRangeQuery}/>
        <label htmlFor='minValue'>Max </label>
        <input type="range" name='maxValue' min="0" max="10" step="0.25" onChange={getRangeQuery}/>
        <label htmlFor='startDate'>Start Date </label>
        <input type="date" name='startDate' onChange={getDateQuery}/>
        <label htmlFor='endDate'>End Date </label>
        <input type="date" name='endDate' onChange={getDateQuery}/>
    </div>
  )
}

export default InputFormComponent