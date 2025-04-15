import intensity from "./assets/glow.png"
import { TextureLoader } from 'three';
import vertexShader from "./glsl/vertexShader";
import fragmentShader from "./glsl/fragement" 
import { useEffect,useRef,useState,useImperativeHandle,useLayoutEffect } from "react";
import { useFrame } from '@react-three/fiber' 
import Wrap from "../BackgroundPerlin/threejsWrap";  
import * as THREE from 'three';
import { PlaneGeometry } from "three";
import React from "react"
  
function PointsImage({texturePath,position=[-0.8, -0.6],
    scaleImg=[1.0, 0.6],pointsNum=[100,100],pointsImgRef,handleOnClick=null,needsPoints=true}) { 
        // console.log(handleOnClick)
    position = [...position, 0] 
    scaleImg = [...scaleImg, 1.0]
    const max_positionx = 2.29/1272 * window.innerWidth;
    const textureLoader = new TextureLoader();
    const geometryRef = useRef(null);
    const geometryRef1 = useRef(null);
    const meshRef = useRef(null); //meshRef做交互使用，因为points物体做交点的时候有点问题
 
    let scale = [0.6,0.3,1.0];
    if(scaleImg){
        scale = scaleImg;
    } 
    const displacementRef = useRef({}); 

    const texture1 = textureLoader.load(texturePath);
    texture1.colorSpace = THREE.SRGBColorSpace 
    const materialRef = useRef(null); 
    const materialRef1 = useRef(null); 

     
 
    useEffect(()=>{ 
        displacementRef.current = {};
        displacementRef.current.previousCursor = new THREE.Vector2(999,999);
        displacementRef.current.cursor = new THREE.Vector2(999,999);
        displacementRef.current.privousMap = {x:0,y:0};
        if(!document.getElementsByClassName('screenCanvas')[0])
        {
            displacementRef.current.canvas = document.createElement('canvas')
            displacementRef.current.canvas.className = "screenCanvas"
            displacementRef.current.canvas.width = 128
            displacementRef.current.canvas.height = 128
            displacementRef.current.canvas.style.position = 'fixed'
            displacementRef.current.canvas.style.width = '256px'
            displacementRef.current.canvas.style.height = '256px'
            displacementRef.current.canvas.style.top = 0
            displacementRef.current.canvas.style.left = 0
            displacementRef.current.canvas.style.zIndex = 10    
        }
        else{
            displacementRef.current.canvas = document.getElementsByClassName('screenCanvas')[0]
        }
        displacementRef.current.glowImage = new Image()
        displacementRef.current.glowImage.src = intensity 
        displacementRef.current.context = displacementRef.current.canvas.getContext('2d') 
        displacementRef.current.raycaster = new THREE.Raycaster();
        displacementRef.current.intersectObject = null;
        displacementRef.current.texture = new THREE.CanvasTexture(displacementRef.current.canvas);
 
    },[texturePath])

    useEffect(()=>{ 
        materialRef.current.uniforms.uIntensityTexture.value = 
                        displacementRef.current.texture
    },[displacementRef.current.texture])

    useLayoutEffect(()=>{
        // console.log('gaibian')
        if(geometryRef.current){ 
            const count = geometryRef.current.attributes.position.count;   
            const randoms = new Float32Array(count);
            const aIRandom = new Float32Array(count);
            for(let i=0;i<count;i++){
                randoms[i] = Math.random();
                aIRandom[i] = (Math.random()>0.5?1.0:-1.0);
            }
            geometryRef.current.setAttribute('aIRandom',new THREE.BufferAttribute(aIRandom,1));
            geometryRef.current.setAttribute('aRandom',new THREE.BufferAttribute(randoms,1))
        }   
        if(geometryRef1.current){ 
            const count = geometryRef1.current.attributes.position.count;   
            const randoms = new Float32Array(count);
            const aIRandom = new Float32Array(count);
            for(let i=0;i<count;i++){
                randoms[i] = Math.random();
                aIRandom[i] = (Math.random()>0.5?1.0:-1.0);
            }
            geometryRef1.current.setAttribute('aIRandom',new THREE.BufferAttribute(aIRandom,1));
            geometryRef1.current.setAttribute('aRandom',new THREE.BufferAttribute(randoms,1))
        }    
    },[geometryRef.current,geometryRef1.current])  
      
    const uTimeRef = useRef({value:0.0});
  
    useFrame((state, delta) =>
    { 
        const obj = displacementRef.current.intersectObject;
        
        if(!obj){
            return;
        }  
        if(!displacementRef.current.context){
            return;
        }
        displacementRef.current.context.globalCompositeOperation = 'source-over'
        displacementRef.current.context.globalAlpha = 0.02
        displacementRef.current.context.fillRect(0,0,displacementRef.current.canvas.width,displacementRef.current.canvas.height);
        
        //取点 
        //先把之前的覆盖掉
        displacementRef.current.context.globalAlpha = 1
        const mapX = obj.uv.x * displacementRef.current.canvas.width; 
        const mapY = (1-obj.uv.y) * displacementRef.current.canvas.height; //uv的y和canvas的不一致 
        displacementRef.current.context.globalCompositeOperation = 'lighten'
        const glowSize = displacementRef.current.canvas.width*0.15; 
        if(displacementRef.current.privousMap.x !== mapX && displacementRef.current.privousMap.y !== mapY){
            // console.log("drawImage",geometryRef.current)
            displacementRef.current.context.drawImage(
                        displacementRef.current.glowImage,mapX- glowSize * 0.5,mapY- glowSize * 0.5,glowSize,glowSize
                    ) 
        }
        displacementRef.current.privousMap.x = mapX ;
        displacementRef.current.privousMap.y = mapY;
        displacementRef.current.texture.needsUpdate = true; 
    })
 
    
   
    const handleMouseMove = (e)=>{ 
        // console.log("move")
        if(needsPoints)
            displacementRef.current.intersectObject = e;
        // setImg(()=>{
        //     return imgInfo;
        // })
    } 
    
    const handleMouseLeave = ()=>{  
        // setImg(()=>{
        //     return {ind:0}
        // }) 
    }
   
    const pointsRef = useRef(null); 
    const argsRef = useRef([1,1,...pointsNum]); 

    useImperativeHandle(pointsImgRef, () => {
        return {
          getPointsRef() {
            return pointsRef
          },
          getGeometryRef() {
            return geometryRef
          },
          getMeshRef(){
            return meshRef
          },
          getUTimeRef(){
            return uTimeRef
          },
          getPositionY(){
            return position[1];
          },
          updateGeometry(pointsNum){
                let geometryn = new PlaneGeometry(1,1,...pointsNum); 
                // console.log(geometryn)
                pointsRef.current.geometry.dispose(); // 清理旧的几何体
                pointsRef.current.geometry = geometryn; // 更新几何体
                geometryRef.current = geometryn; 
                const count = geometryRef.current.attributes.position.count;   
                const randoms = new Float32Array(count);
                const aIRandom = new Float32Array(count);
                for(let i=0;i<count;i++){
                    randoms[i] = Math.random();
                    aIRandom[i] = (Math.random()>0.5?1.0:-1.0);
                }
                geometryRef.current.setAttribute('aIRandom',new THREE.BufferAttribute(aIRandom,1));
                geometryRef.current.setAttribute('aRandom',new THREE.BufferAttribute(randoms,1))
          } 
        };
      }, []);
 
    //   console.log(pointsImgRef)
    return (
        <> 
            <mesh position={position} size={0.1}  scale={scale} 
                            visible={false}
                            ref={meshRef}
                            onPointerMove={handleMouseMove}  
                            onPointerLeave={handleMouseLeave}
                            onClick={handleOnClick}>
                        <planeGeometry args={[1, 1, 180, 180]}
                        ref={geometryRef1} color="red"/>
                        <shaderMaterial
                        ref={pointsImgRef}
                        />  
            </mesh>  
            <points position={position}  scale={scale} ref={pointsRef}>
                <planeGeometry args={argsRef.current}
                        ref={geometryRef} color="red"/>
                <shaderMaterial vertexShader={vertexShader} 
                        fragmentShader={fragmentShader}
                        uniforms={{
                            uResolution: new THREE.Uniform(new THREE.Vector2(
                                window.innerWidth * Math.min(window.devicePixelRatio, 2), 
                                window.innerHeight * Math.min(window.devicePixelRatio, 2))),
                            uTexture:  { value: texture1 },
                            uIntensityTexture :{value: displacementRef.current.texture}, 
                            uTime: uTimeRef.current,
                            uMaxPositionX: new THREE.Uniform(max_positionx) //用这个值放到[0-1]区间就ok了((
                        }}   
                        ref={materialRef} />  
            </points>  
        </> 
    )
}
 
export default PointsImage
