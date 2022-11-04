
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
//coords is an object that has 2 items coords.lat and coords.long. 
const [coords,setCoords]=useState({});

//this function takes input as the array and returns the center
const getCoordsFromResult=(coordsArray)=>{
  console.log('coordsArray',coordsArray);
  //center longitude is first 2 values
  const centerLong = (coordsArray[0]+coordsArray[1])/2;
  //center latitude is last 2 values.
  const centerLat = (coordsArray[2]+coordsArray[3])/2;

  //return something that can work with coords
  const centerCoords={
    latitude:centerLat,
    longitude:centerLong
  }
  return centerCoords;
}

useEffect(()=>{
  axios({
    url:'https://api.geocodify.com/v2/geocode',
    params:{
      api_key:'88281bd6042c6bf0c44b65328bcf5a51fa8c949b',
      q:'toronto'
    }
  }).then((res)=>{
    // this structure res.data.response.bbox gives us the bounding box with first 2 entries as longitude and the other 2 as lats
    // console.log(res.data);
    const center = getCoordsFromResult(res.data.response.bbox);

    setCoords(center);
  }).catch((err)=>{
    console.log(err);
  })
},[])

useEffect(()=>{

  axios({
    url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
    params:{
      format:'geojson',
      starttime:'2022-10-03',
      endtime:'2022-11-03',
      orderby:'magnitude',
      latitude:coords.latitude, 
      longitude:coords.longitude,
      maxradiuskm:1000,
    }
  }).then((res)=>{
    console.log(res.data);

  }).catch((err)=>{
    console.log(err);
  })
},[coords]);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;

//since we have 1000s in a day, we will see if limiting a region gives us something manageable
