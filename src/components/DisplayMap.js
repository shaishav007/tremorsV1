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
                
        </div>
  )
}

export default DisplayMap