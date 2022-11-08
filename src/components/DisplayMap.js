
import { MapContainer, TileLayer, Popup,useMap ,Marker} from 'react-leaflet';

//this is exactly like any other component just defined inside the file instead of outside, THIS IS responsible for changing the center
function ChangeView({center,zoom}){
    const map = useMap();
    map.setView(center,zoom);
    return null;
}

const DisplayMap = (props) => {
    // console.log(props.markerPopupInfo[0].coords[1],props.markerPopupInfo[0].coords[0])
    console.log('marker popup info',props.markerPopupInfo);
    return (
        <div>

                {/* Top container is considered immutable so a changeView or any other named object has to be below this as a child */}
                <MapContainer center={[props.latitude,props.longitude]} zoom={50} scrollWheelZoom={false}> 
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
                                <Marker position={[item.coords[1],item.coords[0]]} className="marker">
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