import axios from 'axios';
import { geoJson } from 'leaflet';
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
import InputFormComponent from './InputFormComponent'


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
        <MapContainer center={[userChoices.latitude, userChoices.longitude]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[userChoices.latitude,userChoices.longitude]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
        :<>Try filling the form up</>
        }
    </div>
  )
}

export default MapPage