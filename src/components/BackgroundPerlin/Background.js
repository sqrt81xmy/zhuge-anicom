import { Canvas } from '@react-three/fiber' 
import * as THREE from 'three'
import Perlin from './glsl/perlin'; 
import glowImagex from "./assets/glow.png"
import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef,useEffect } from 'react';
import Wrap from './threejsWrap';
import React from "react"
// import GUI from 'lil-gui'

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const clock = new THREE.Clock()

var bgColor = [
    {
         uHighColor:{ value: new THREE.Color(107/255,166/255,230/255) }, //这个应该是Color类，不能用Verctor3类
         uLowColor:{ value: new THREE.Color(194/255,228/255,255/255) }, 
    },
    {
        uHighColor:{ value: new THREE.Color(255/255,163/255,163/255) }, //这个应该是Color类，不能用Verctor3类
        uLowColor:{ value:  new THREE.Color(255/255,219/255,219/255) },
    },
    {
        uHighColor:{ value: new THREE.Color(255/255,205/255,163/255) }, //这个应该是Color类，不能用Verctor3类
        uLowColor:{ value:  new THREE.Color(255/255,237/255,209/255) },
    },
    {
        uHighColor:{ value: new THREE.Color(137/255,206/255,178/255) }, //这个应该是Color类，不能用Verctor3类
        uLowColor:{ value:  new THREE.Color(219/255,255/255,232/255) },
    },
    {
        uHighColor:{ value: new THREE.Color(206/255,183/255,240/255) }, //这个应该是Color类，不能用Verctor3类
        uLowColor:{ value:  new THREE.Color(253/255,219/255,255/255) },
    }
]

function ReactFlag({id}) {
     // Debug
    //  const gui = new GUI()

    const meshRef = useRef(null);
    const materialRef = useRef(null);

    const displacement = {};
    displacement.previousCursor = new THREE.Vector2(999,999);
    displacement.cursor = new THREE.Vector2(999,999);
    if(!document.getElementsByClassName('screenCanvas')[0])
    {
        displacement.canvas = document.createElement('canvas')
        displacement.canvas.className = "screenCanvas"
        displacement.canvas.width = 128
        displacement.canvas.height = 128
        displacement.canvas.style.position = 'fixed'
        displacement.canvas.style.width = '256px'
        displacement.canvas.style.height = '256px'
        displacement.canvas.style.top = 0
        displacement.canvas.style.left = 0
        displacement.canvas.style.zIndex = 10 
        displacement.canvas.style.display = 'none'
        document.body.append(displacement.canvas) 
    }
    else{
        displacement.canvas = document.getElementsByClassName('screenCanvas')[0]
    }
    displacement.glowImage = new Image()
    displacement.glowImage.src = glowImagex
    displacement.context = displacement.canvas.getContext('2d')
    displacement.raycaster = new THREE.Raycaster();

    const handleMouseMove = (e)=>{ 
        displacement.cursor = new THREE.Vector2((e.clientX/sizes.width)*2-1,-((e.clientY/sizes.height)*2-1));
       
    }
    window.addEventListener('pointermove',handleMouseMove);
    displacement.texture = new THREE.CanvasTexture(displacement.canvas); 

    useFrame((state, delta) =>
    {
        const elapsedTime = clock.getElapsedTime()
      
        materialRef.current.uniforms.uTime.value = elapsedTime;
        // console.log( materialRef.current.uniforms.uTime.value);
        // Update controls
        displacement.raycaster.setFromCamera(displacement.cursor,state.camera);
        const obj = displacement.raycaster.intersectObject(meshRef.current)
        //先填充一个黑色矩形
        //一直会有帧往上补
        displacement.context.globalCompositeOperation = 'source-over'
        displacement.context.globalAlpha = 0.02
        displacement.context.fillRect(0,0,displacement.canvas.width,displacement.canvas.height);
        //取点
        if(obj.length){
            //先把之前的覆盖掉
            displacement.context.globalAlpha = 1
            const mapX = obj[0].uv.x * displacement.canvas.width;
            // console.log(obj[0].uv.x)
            const mapY = (1-obj[0].uv.y) * displacement.canvas.height; //uv的y和canvas的不一致
            // console.log(obj[0].uv.y,displacement.canvas.height,mapY)
            // console.log(mapX,mapY)
            displacement.context.globalCompositeOperation = 'lighten'
            const glowSize = displacement.canvas.width*0.25;
            displacement.context.drawImage(
                displacement.glowImage,mapX- glowSize * 0.5,mapY- glowSize * 0.5,displacement.canvas.width*0.25,displacement.canvas.width*0.25
            ) 
        }
        // Update controls
        // controls.update()
        displacement.texture.needsUpdate = true;
    })
    // const material = materialRef.current;
    // useEffect(()=>{
    //     const material = materialRef.current;

    //     if(material)
    //         {
    //             console.log(material.uniforms.uHighColor)
    //             gui.addColor(material.uniforms.uHighColor,'value').name('highColor').onChange(()=>{console.log(material.uniforms.uLowColor.value)});
    //             // gui.addColor(material.uniforms.uMidColor,'value').name('midColor').onChange(()=>{console.log(material.uniforms.uLowColor.value)});
    //             gui.addColor(material.uniforms.uLowColor,'value').name('lowColor').onChange(()=>{console.log(material.uniforms.uLowColor.value)});
    //         }
    // },[materialRef.current])

    useEffect(()=>{
        const material = materialRef.current;
        if(material)
        material.needsUpdate = true;
    },[])

    // useEffect(()=>{ 
    //     materialRef.current.uniforms.uHighColor.value.set(bgColor[id].uHighColor.value);
    //     materialRef.current.uniforms.uLowColor.value.set(bgColor[id].uLowColor.value);
    //     materialRef.current.uniforms.needsUpdate = true;
    //     console.log(id,materialRef.current.uniforms.uHighColor.value);
    // },[id])
    

    return ( 
            <mesh ref={meshRef} rotation={[0,0,Math.PI/2]} width={20} height={20}  > 
                <planeGeometry width={2} height={2} position={[0,0,0]} widthFragments={32} heightFragments={32}/>
                <shaderMaterial fragmentShader={Perlin} transparent={true} uniforms={
                    {
                        uHighColor:new THREE.Uniform(bgColor[id].uHighColor.value), //这个应该是Color类，不能用Verctor3类
                        uLowColor:new THREE.Uniform(bgColor[id].uLowColor.value),
                        uDisplacementTexture: new THREE.Uniform(displacement.texture),
                        uTime:{ value: 0 },
                    }
                } ref={materialRef}
                    vertexShader={'#ifdef GL_ES\n'+
                    'precision mediump float;\n' +
                   '#endif\n' + /*glsl*/` 
                        // uniform mat4 projectionMatrix;
                        // uniform mat4 viewMatrix;
                        // uniform mat4 modelMatrix;
                        uniform vec2 uFrequency;
                        uniform float uTime;
                        uniform float uSpeed;
            
                        // attribute vec3 position;
                        attribute float aRandom;
            
                        varying float vRandom;
                        varying vec2 vUv;
                        varying float vEvaluation; //将varying类型的变量传给fragment
                        // uniform sampler2D uDisplacementTexture;
            
                        void main(){ 
                            vec4 modelPosition = modelMatrix * vec4(position,1.0);
            
                            float evaluation = sin(modelPosition.x * uFrequency.x - uTime * uSpeed)
                                             * sin(modelPosition.z * uFrequency.y - uTime * uSpeed)
                                             * 0.1;
            
                            // modelPosition.x += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
                            // modelPosition.y += evaluation;
                             
                            vec4 viewPosition = viewMatrix * modelPosition;
                            vec4 projectedPosition = projectionMatrix *viewPosition;
                            gl_Position = projectedPosition;
                            // float intensity = texture(uDisplacementT/exture,uv).r;
                            vRandom = aRandom; 
                            vUv = uv;
                            vEvaluation = evaluation;
                        }
                    `}
                />
            </mesh> 
    )
}

function Background({id = 0,
                    bgColor_def = []}) {

    // param: id number
    //        bgColor_def array
    useEffect(()=>{
        if(bgColor_def.length){
            bgColor = bgColor_def
        }
    },[])
    
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
                position: [0,0,0.2],
                aspect: sizes.width / sizes.height
            } }
            width={window.innerWidth*1.1}
            height={window.innerHeight*1.1}
            
        >
            <ReactFlag id={id}/>
        </Canvas>
    )
}

export default Background;