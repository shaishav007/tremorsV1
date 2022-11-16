import { Canvas, useFrame } from "@react-three/fiber";
import "./styles/DisplayMap.css"
import boomSvg from '../components/Assets/Images/boomSvg.svg';
import { useState, useRef } from "react";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import Legend from './Legend';
import { Suspense } from "react";
import Earth from "./Earth";
import Marker from "./Marker";
import { Vector3 } from "three";



function Box(){
    return(
      <mesh>
        <boxBufferGeometry attach="geometry"/>
        <meshLambertMaterial attach="material" color="green"/>
      </mesh>
    );
}


const DisplayMap = (props) => {
    //a ref for the orbitcontrols 
    const ref = useRef()
    //camera position states
    const [lerping, setLerping] = useState(false)
    const [to, setTo] = useState()
    const [target, setTarget] = useState()
    const [selected, setSelected] = useState(-1)

    //for the description div
    const [descData,setDescData]=useState(0);

    function Animate({ controls, lerping, to, target }) {
        useFrame(({ camera }, delta) => {
          if (lerping) {
            camera.position.lerp(to, delta )
            controls.current.target.lerp(target, delta )
          }
        })
      }

    const Description=()=>{
        //here we will return the html div
        if (descData!==0){
            const descPosition = descData.position;
            const descVector = new Vector3(descPosition[0],descPosition[1],descPosition[2]);
        
        return(
        descData!=0?
        <Html position={descVector} rotation={[0,1,0]}>
            <div className="descriptionPopup">
                <button className="closeButton" onClick={()=>{setDescData(0)}}>x</button>
                magnitude: {descData.data.magnitude}  , 
                {descData.data.place},
                responder:{descData.data.responder}
                
            </div>
        </Html>
        :<></>
        )
        }
        else{
            return(<></>)
        }
    }
    const focusOnMarker=(markerPos,desc)=>{
        const mag = desc.magnitude;
        // the camera position should be a bit away on the same normal
        const cam_x = markerPos[0]*(1+(mag*0.15));
        const cam_y = markerPos[1]*(1+(mag*0.15));
        const cam_z= markerPos[2]*(1+(mag*0.15));
        // console.log(cam_x,cam_y,cam_z);
        setTo(new Vector3(cam_x,cam_y,cam_z));
        // setTarget({
        //     "x":markerPos[0],
        //     "y":markerPos[1],
        //     "z":markerPos[2]
        // });
        setTarget(new Vector3(markerPos[0],markerPos[1],markerPos[2]));
        setLerping(true);
        setDescData(
            {
                position:markerPos,
                data:desc,
            }
        );
    }

    return (
        <div className='mapComponentsContainer'>
            <Legend earthquakesFound={props.markerPopupInfo.length}/>
            <Canvas onPointerDown={() => setLerping(false)} onWheel={() => setLerping(false)}>
                <Suspense fallback={null}>
                    <OrbitControls ref={ref} target={[0,0,0]}/>
                    <ambientLight intensity={0.25}/>
                    <spotLight position={[10,5,10]} angle={0.3} intensity={1}/>
                    <Stars intensity={0.1} radius={400} depth={60}/>
                    <Box/>
                    <Earth/>
                    <Animate controls={ref} lerping={lerping} to={to} target={target} />
                    <Description />
                    {
                        // code to display each marker based on coordinates
                        props.markerPopupInfo.map((item)=>{
                            
                            return(
                            <Marker latitude={item.coords[1]} longitude={item.coords[0]} radius={1} size={0.01*item.popupInfo.magnitude} description={item.popupInfo} clickResponse={focusOnMarker}/>
                            );
                        })
                    }
                    
                </Suspense>
            </Canvas>
        </div>
  )
}

//for annotations whichever marker is selected on clickResponse, we are already passing 
//set up only one annotation object and we will set its position and rotation based on the normal of the marker that was selected. So right now just a box with no content

export default DisplayMap