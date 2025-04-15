import React from 'react';
import "./LightSweep.css"

const LightSweep = ({
  children,
  lightAngle = '45deg',      // the agle of the light, it should be in the '45deg` format
  cycle = 8,                // from the begin to the end, including the delay time
  delay = 0,                // the time to delay
  infinite_interact = true, // if you want to interact, just set to false; if you set this variable as true, the animationKey will disabled.
  animationKey = 1,     //If you want to interact with the animation, just use the state variable as the key.
//   color = 'rgba(255, 255, 255, 0.7)', // the color of the light
  animationDirection = "left2right", // you can choose this as "left2right"/"right2left"/"top2down"/"down2top"
  style = null
}) => {
    // console.log(animationKey)
    if(delay>cycle){
        const x = Math.floor(delay/cycle)
        delay = delay-x * cycle;
    }
    else if(delay == cycle)
    {
        delay = 0;
    }
    let start_x;
    let start_y;
    if(infinite_interact){
        animationKey = 1;
        start_x = "0";
        start_y = "0";
    }
    else{
        start_x = "-100%";
        start_y = "-100%";
        delay = 0;
    }

    let animationName;
    if(delay == 0){
        animationName = 'without-delay'; 
    }
    else{
        animationName = 'with-delay'; 
    }
 

    const getStartMidEnd = () => {
        switch (animationDirection) {
          case "right2left":
            return { start: "100%", end: "-100%", width:"50%", height:"100%"}; // 从右向左扫
          case "left2right":
            return { start: "-100%", end: "100%", width:"50%", height:"100%"}; // 从左向右扫（默认）
          case "down2top":
            return { start: "0 200%", end: "0 -100%", width:"100%", height:"50%"}; // 从下向上扫
          case "top2down":
            return { start: "0 -100%", end: "0 200%", width:"100%", height:"50%"}; // 从上向下扫
          default:
            return { start: "-100%", end: "200%" };
        }
      };
    
    let {width,height} = getStartMidEnd();
    const getKeyFrames = ()=>{
        if(delay == 0){ 
            const {start,end} = getStartMidEnd(); 
            return `
            @keyframes without-delay {
              0% { background-position: ${start}; }
              100% { background-position: ${end}; }
            }
          `;
        }
        else{
            let pausePosition = delay / cycle;   
            const {start,end} = getStartMidEnd();  
            pausePosition = delay / cycle;
            return `
                @keyframes with-delay {
                0% { background-position: ${start}; }
                ${pausePosition.toFixed(2) * 100}% { background-position: ${start}; }
                100% { background-position: ${end}; }
                }
            `; 
        }
    }

    const sweepStyle = {
        '--sweep-lightAngle': lightAngle,
        '--sweep-cycle': `${cycle}s`,
        '--sweep-delay': `${delay}s`,
        '--sweep-iteration': infinite_interact ? 'infinite' : '1',
        // '--sweep-color': color,
        // '--sweep-width': width,
        '--sweep-animationName': `${animationName}`,
        '--sweep-width': `${width}`,
        '--sweep-height': `${height}`,
        '--sweep-x': `${start_x}`,
        '--sweep-y': `${start_y}`
    };

    // 动态生成 CSS 变量
    if(!style){
        style = sweepStyle
    }
    else{
        style = {...style,...sweepStyle}    
    }


    return (
        <>
            <style>{getKeyFrames()}</style>
            <span  className="LightSweep"  style={style} key={animationKey}> {children} </span>
        </>
        
    );
};

export default LightSweep;