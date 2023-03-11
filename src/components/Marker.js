import React from 'react'


//use latitude and longitude to calculate the right x,y,z
//formulas I calculated x = rcos(long)cos(lat),y= rsin(long)cos(lat),z = rsin(lat)
const calculateCoords = (r,lat,lng)=>{
  //first convert everything to radians
  const lat_radians = lat*(Math.PI)/180;
  const lng_radians = lng*(Math.PI)/180;
  //now apply the formula to get the coordinates
  const x = r*Math.cos(lat_radians)*Math.cos(lng_radians);
  const z = -r*Math.cos(lat_radians)*Math.sin(lng_radians);
  const y = r*Math.sin(lat_radians);

  //this should be the new position
  return[x,y,z]
}

const calculateColor=(mag)=>{
  //get red get blue and then combine
  //red is 0 for 0 -5 and then starts increasing till 255 at 10
  const absoluteMag = Math.abs(mag)
  const red = (51*(Math.max(0,absoluteMag-5)))/255;

  //blue is 255 at 0 and gets out at 5
  const blue = (-51*(Math.min(0,absoluteMag-5)))/255;

  //green is max in the middle so it has to be a triangle function
  const green = (255-51*(Math.abs(absoluteMag-5)))/255;
  
  return [red,green,blue,0.1];
  
}




const Marker = (props) => {

  const goToMarkerAndDisplayText=(markerPos,desc)=>{
    //get the clickresponse thing working
    props.clickResponse(markerPos,desc);
  }
  

  return (
    < >
    
    <mesh position={calculateCoords(props.radius,props.latitude,props.longitude)}  onClick={()=>{goToMarkerAndDisplayText(calculateCoords(props.radius,props.latitude,props.longitude),props.description)}} >
        
        <sphereGeometry args={[props.size*0.25,32,32]} />
        <meshStandardMaterial color={calculateColor(props.description.magnitude)} emissive={true} emissiveIntensity={2000}/>
        
    </mesh>
    <mesh position={calculateCoords(props.radius,props.latitude,props.longitude)}   >
        <sphereGeometry args={[props.size,32,32]} />
        <meshStandardMaterial color={calculateColor(props.description.magnitude)} transparent={true} opacity={0.4}/>
    </mesh>
    </>
  )
}

//on click the camera should translate to a particular position

export default Marker