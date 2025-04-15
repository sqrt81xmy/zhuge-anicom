import { Canvas } from '@react-three/fiber' 
import * as THREE from 'three'
import { sizes } from './Background'; 
import React from 'react';
function Wrap({
    children,style= {
        width:'100vw',
        height:'100vh' 
    }
}) {
    return (  
        <Canvas
            gl={ {
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                // outputColorSpace: THREE.SRGBColorSpace
            } }
            camera={ {
                fov: 75,
                near: 0.1,
                far: 200,
                // position: [ 0,0, 0.3 ],
                position: [0,0,1.2],
                aspect: sizes.width / sizes.height
            } }
            width={window.innerWidth}
            height={window.innerHeight}
            style={
               style
            } 
        >
            {children}
        </Canvas> 
    )
}

export default Wrap;