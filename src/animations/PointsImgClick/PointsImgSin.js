import { gsap } from "gsap-trial";
import React from "react"
function usePointsImgSin() { 
    const handleOnClick = (pointsImgRef,delay,duration)=>{ 
        //抖抖抖 快 
        const uTimeRef = pointsImgRef.current.getUTimeRef();
        
        gsap.delayedCall(delay,()=>{ 
            
            gsap.to(uTimeRef.current,{
                value: duration/2,duration:duration/2, 
            }) 
            // console.log("sin",uTimeRef,delay,duration)
            //抖抖抖 慢
            gsap.delayedCall(duration/2, () => {
                gsap.to(uTimeRef.current, {
                    value: 0.0,
                    duration: duration / 2, 
                });
            }); 
        }) 
        // pointsImgRef.current.updateGeometry(pointsNum)
    } 
      //回归原位置
    return handleOnClick
}

export default usePointsImgSin
