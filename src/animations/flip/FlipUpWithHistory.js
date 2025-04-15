import "./FlipUpWithHistory.css"
import gsap from "gsap-trial"
import React from "react";

export function goFlipUpWithHistory(){
    gsap.to(".FlipUpWithHistory", {  y: '-130%', x:0,duration: 0.6, opacity:1 });
}

function FlipUpWithHistory({pre,nxt,spanClassName}) {
    return (
        <span className={`FlipUpWithHistory ${spanClassName}`} key={pre}>
            {pre} <br/>
            {nxt} 
        </span>
    )
}

export default FlipUpWithHistory
