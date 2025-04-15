import gsap from "gsap-trial"
import React from "react"
function LoadRow(selectors) {
    //为了不影响您的dom结构，请您传入一个数组
    gsap.fromTo(selectors,{
        y:80
    },{
        duration: 1.5,
        y:0,
        stagger: 0.05,
        ease: "back.in"
    })
 
}

export default LoadRow
