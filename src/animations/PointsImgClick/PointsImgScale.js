import { gsap } from "gsap-trial"; 
import React from "react"
function usePointsImgScale() { 
    const handleOnClick = (pointsImgRef,scale,delay,duration)=>{ //delay和duration:s
        //抖抖抖 快
        const pointsRef =  pointsImgRef.current.getPointsRef();
        const meshRef = pointsImgRef.current.getMeshRef();   
        gsap.delayedCall(delay,()=>{ 
             //变小
            gsap.to(pointsRef.current.scale,{
                x: scale.x, y: scale.y,
                duration: duration
            })  
            gsap.to(meshRef.current.scale,{
                x: scale.x, y: scale.y,
                duration: duration
            }) 
        }) 
        // pointsImgRef.current.updateGeometry(pointsNum)
    } 
      //回归原位置
    return handleOnClick
}

export default usePointsImgScale
