import { click } from "@testing-library/user-event/dist/click";
import { useEffect,useState } from "react";
import { gsap } from "gsap-trial";
import { PlaneGeometry } from "three";
import React from "react"

function usePointsImgClick() { 
    const handleOnClick = (pointsImgRef,position,scale,pointsNum)=>{
        const duration = 800;
        //抖抖抖 快
        const pointsRef =  pointsImgRef.current.getPointsRef();
        const geometryRef = pointsImgRef.current.getGeometryRef(); 
        const meshRef = pointsImgRef.current.getMeshRef(); 
        const uTimeRef = pointsImgRef.current.getUTimeRef();
        gsap.to(uTimeRef.current,{
            value: duration/1000,duration:duration/1000, 
        }) 
        //抖抖抖 慢
        gsap.delayedCall(duration / 1000, () => {
            gsap.to(uTimeRef.current, {
                value: 0.0,
                duration: duration / 1000, 
            });
        });
        //变小
        gsap.to(pointsRef.current.scale,{
            x: scale.x, y: scale.y,
            duration:2*duration/1000
        })  
        gsap.to(meshRef.current.scale,{
            x: scale.x, y: scale.y,
            duration:2*duration/1000
        }) 
        const fduration = 600;; 
        gsap.delayedCall(2*duration/1000,()=>{ 
            gsap.to(pointsRef.current.position, 
                {  x:  position.x, y:  position.y, z:0,
                    duration: fduration/1000 
                }); 
            gsap.to(meshRef.current.position, 
                {  x:  position.x, y:  position.y, z:0,
                    duration: fduration/1000 
                }); 
        }) 
        pointsImgRef.current.updateGeometry(pointsNum)
    } 
      //回归原位置
    return handleOnClick
}

export default usePointsImgClick
