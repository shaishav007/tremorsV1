import { MapContainer, TileLayer, Popup,useMap ,Marker} from 'react-leaflet';
import L from 'leaflet';
import "./styles/DisplayMap.css"
import boomSvg from '../components/Assets/Images/boomSvg.svg'

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




const DisplayMap = (props) => {



    return (
        <div className='mapComponentsContainer'>
                <Legend earthquakesFound={props.markerPopupInfo.length}/>
                {/* Top container is considered immutable so a changeView or any other named object has to be below this as a child */}
                <MapContainer center={[props.latitude,props.longitude]} zoom={2} scrollWheelZoom={false}> 
                     {/* just made a component here and tried the setView function on this */}
                    <ChangeView center={[props.latitude,props.longitude]} zoom={2} scrollWheelZoom={false} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* The data is stored in markerPopupInfo, for each item in it generate a marker component. */}
                      
                      
                        {
                            
                            props.markerPopupInfo!==[]?
                            props.markerPopupInfo.map((item)=>{
                                return(
                                <Marker 
                                    position={[item.coords[1],item.coords[0]]} 
                                    icon={customIcon(item.popupInfo.magnitude)}
                                    key={item.id}
                                    
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