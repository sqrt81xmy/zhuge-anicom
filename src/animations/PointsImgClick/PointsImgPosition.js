import { gsap } from "gsap-trial";
import React from "react"
function usePointsImgPosition() {
    const handleOnClick = (pointsImgRef,position,
                                delay=0.6,duration=0.8)=>{ //duration,delay:s 
        //抖抖抖 快
        const pointsRef =  pointsImgRef.current.getPointsRef(); 
        const meshRef = pointsImgRef.current.getMeshRef();    
        gsap.delayedCall(delay,()=>{ 
            gsap.to(pointsRef.current.position, 
                {  x:  position.x, y:  position.y, z:0,
                    duration: duration
                }); 
            gsap.to(meshRef.current.position, 
                {  x:  position.x, y:  position.y, z:0,
                    duration: duration 
                }); 
        }) 
        // pointsImgRef.current.updateGeometry(pointsNum)
    } 
      //回归原位置
    return handleOnClick
}

export default usePointsImgPosition
