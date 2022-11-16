import React from 'react'

//texture maps for earth
import diffuse8K from "../components/Assets/Images/diffuse8K.jpg";
import disp2K from "../components/Assets/Images/bump2K.jpg";
import night2K from "../components/Assets/Images/night2K.jpg";
import normal2K from "../components/Assets/Images/normal2K.jpg";
import spec2K from "../components/Assets/Images/spec2K.jpg";

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Earth = () => {

  const [colorMap, normalMap, specularMap,displacementMap]= useLoader(TextureLoader,[diffuse8K,normal2K,spec2K,disp2K])

  return (
    
    <mesh>
        <sphereGeometry args={[1,32,32]}/>
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} bumpMap={displacementMap} />
    </mesh>
    
  )
}

export default Earth