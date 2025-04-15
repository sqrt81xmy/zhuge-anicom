import React from 'react'; 
import "../../css/wheel.css"

  
export default function IndexWheel({fraction,r}) { 
    const circle = 2 * Math.PI * r; 
    const deltaX = r+5;
    const deltaY = r+5;
    const angle = Math.PI/4;
    const factor = 0.8; 
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={2*r+10} height={2*r+10} padding="10px">
            <circle cx={deltaX} cy={deltaY} r={r} stroke="rgb(41, 38, 38)" stroke-width="1" fill="none"
                    stroke-dasharray={circle} stroke-dashoffset={circle-fraction*circle} transform={`rotate(-90,${deltaX},${deltaY})`} className='circlebar_progress'/>
            <circle  cx={deltaX} cy={deltaY} r={r} stroke="#3f3f3f3f" stroke-width="1"  fill="none"  className='circlebar_full'/>
            <line x2={deltaX-factor*r*Math.cos(angle)} y2={deltaY+factor*r*Math.sin(angle)} 
                x1={deltaX+factor*r*Math.cos(angle)} y1={deltaY-factor*r*Math.sin(angle)} stroke="rgb(41, 38, 38)" stroke-width="1"/>
        </svg> 
    );
}