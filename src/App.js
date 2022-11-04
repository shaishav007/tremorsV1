
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

//importing leaflet stuff here
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'




function App() {
//coords is an object that has 2 items coords.lat and coords.long. 
const [coords,setCoords]=useState([]);

//a state to trigger that data is in
const[dataIsIn,setDataIsIn] = useState(false);

//this function takes input as the array and returns the center
const getCoordsFromResult=(coordsArray)=>{
  console.log(coordsArray);
  //center longitude is first 2 values
  const centerLong = (coordsArray[0]+coordsArray[2])/2;
  //center latitude is last 2 values.
  const centerLat = (coordsArray[1]+coordsArray[3])/2;

  //return something that can work with coords
  const centerCoords={
    latitude:centerLat,
    longitude:centerLong
  }

  console.log('centerCoords:',centerCoords);
  return [centerCoords.latitude,centerCoords.longitude];
}

useEffect(()=>{
  axios({
    url:'https://api.geocodify.com/v2/geocode',
    params:{
      api_key:'88281bd6042c6bf0c44b65328bcf5a51fa8c949b',
      q:'Ottawa'
    }
  }).then((res)=>{
    // so this results in multiple entries of all places that match query. Like there are 10 Torontos and 10 Ottawas because the idiots who settled here couldn't find unique names. Might as well have used traditional indigenous names, it would have saved me an hour. so the features part contains the closest match to the query so the first item in that is going to be our location bounding box
    console.log(res.data);
    const center = getCoordsFromResult(res.data.response.features[0].bbox);

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
      latitude:coords[0], 
      longitude:coords[1],
      maxradiuskm:1000,
    }
  }).then((res)=>{
    // console.log(res.data);

    //now that we know that data is here we can set that variable
    setDataIsIn(true);

  }).catch((err)=>{
    console.log(err);
  })
},[coords]);

  return (
    <div className="App">
      <div className='mapOuter'>
        {
          dataIsIn?
          <MapContainer center={[coords[0], coords[1]]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coords[0], coords[1]]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          :<>map is loading</>
        }
      </div>
    </div>
  );
}

export default App;

//since we have 1000s in a day, we will see if limiting a region gives us something manageable
