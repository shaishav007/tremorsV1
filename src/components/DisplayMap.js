import React, { useEffect,useState } from 'react';
import { MapContainer, TileLayer, Marker,Popup,useMap } from 'react-leaflet';
import { geoJson } from 'leaflet';


//this is exactly like any other component just defined inside the file instead of outside
function ChangeView({center,zoom}){
    const map = useMap();
    map.setView(center,zoom);
    console.log('code is here!');
    return null;
}

const DisplayMap = (props) => {
    
      

    return (
        <div>

                {/* Top container is considered immutable so a changeView or any other named object has to be below this as a child */}
                <MapContainer center={[props.latitude,props.longitude]} zoom={50} scrollWheelZoom={false}> 
                     {/* just made a component here and tried the setView function on this */}
                    <ChangeView center={[props.latitude,props.longitude]} zoom={5} scrollWheelZoom={false} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[props.latitude,props.longitude]}>
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                </MapContainer>
        </div>
  )
}

export default DisplayMap