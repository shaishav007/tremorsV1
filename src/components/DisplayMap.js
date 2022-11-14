import { MapContainer, TileLayer, Popup,useMap ,Marker, Circle,Rectangle} from 'react-leaflet';
import L from 'leaflet';
import "./styles/DisplayMap.css"
import boomSvg from '../components/Assets/Images/boomSvg.svg'
import { useState } from 'react';

import Legend from './Legend';


//this is exactly like any other component just defined inside the file instead of outside, THIS IS responsible for changing the center
function ChangeView({center,zoom}){
    const map = useMap();
    map.setView(center,zoom);
    return null;
}



// Create custom icon
const customIcon = (mag) => {
    let addedClass = 'markerGeology'
    if (mag > 3.5){
        addedClass= 'markerRich'
    }
    else if (mag > 6){
        addedClass= 'markerStrong'
    } else if (mag > 7){
        addedClass= 'markerAll'
    }
    return L.icon({
        iconUrl:boomSvg,
        iconSize: [75, 75],
        className:addedClass
    })
}


//adding the circle filloptions here

const DisplayMap = (props) => {

    const [circleCenter,setCircleCenter] = useState(props.circleCenter);
    
    const setCircleOptions=(center)=>{
        setCircleCenter([center[1],center[0]]);
    }

    return (
        <div className='mapComponentsContainer'>
                <Legend/>
                {/* Top container is considered immutable so a changeView or any other named object has to be below this as a child */}
                <MapContainer center={[props.latitude,props.longitude]} zoom={2} scrollWheelZoom={true}> 
                     {/* just made a component here and tried the setView function on this */}
                    <ChangeView center={[props.latitude,props.longitude]} zoom={2} scrollWheelZoom={true} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* The data is stored in markerPopupInfo, for each item in it generate a marker component. */}
                      
                        {   
                            circleCenter.length>0?
                            <Circle center={circleCenter} radius={2000000} />
                            :<></>
                        }
                        {
                            
                            props.markerPopupInfo!==[]?
                            props.markerPopupInfo.map((item)=>{
                                return(
                                <Marker 
                                    position={[item.coords[1],item.coords[0]]} 
                                    icon={customIcon(item.popupInfo.magnitude)}
                                    key={item.id}
                                    eventHandlers={
                                        {
                                            // set the circle options here => fill, stroke and other stuff.
                                            click:()=>{setCircleOptions(item.coords)},
                                        }
                                    }
                                    >
                                    <Popup>
                                    Magnitude:{item.popupInfo.magnitude}, <br/>
                                    Place:{item.popupInfo.place},
                                    responder:{item.popupInfo.responder}
                                    
                                    </Popup>
                                </Marker>
                                )
                            })
                            :<></>
                        }
                </MapContainer>
        </div>
  )
}

export default DisplayMap