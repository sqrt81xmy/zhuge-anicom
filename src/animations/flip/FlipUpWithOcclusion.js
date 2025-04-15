import "./FlipUpWithOcclusion.css"
import gsap from "gsap-trial"
import React from "react"

export function goFlipUpWithOcclusion(){
    // console.log("goFlipUpWithOcclusion")
    gsap.to(".fuwo-wrapSpan", {  y: 0,duration: 0.7, opacity:1 });
}

function FlipUpWithOcclusion({text,wrapClassName,spanClassName}) {
    return (
        <div className={`fuwo-wrap ${wrapClassName}`}  >
            <span className={`fuwo-wrapSpan ${spanClassName}`} key={text} >
                {text}
            </span>
        </div>
    )
}

export default FlipUpWithOcclusion
