import LightSweep from "./animations/Light-Sweep"
import { useState } from "react"
function App() {
    //If you want to control the animation, just use the state variable as the animationKey
    //you can choose the `infinite` and the `interact` version
    //you can choose the direction : "left2right"/"right2left"/"top2down"/"down2top"
    //you can set the speed of the animation using `delay` and `cycle`
    //you can set the style and we will merge your style and our style
    const [click,setClick] = useState(false)
    
    return (
        <>
            <LightSweep 
                animationKey={click}
                animationDirection="left2right"
                lightAngle="45deg"
                cycle={4}
                delay={6} 
                infinite_interact={false} 
                style={{'fontSize':'30px',flexWrap:'wrap','display':'flex'}}>
                今天的天可真蓝
            </LightSweep>
            <button onClick={()=>{setClick((click)=>{return !click})}} style={{'width':'30px',height:'30px'}}></button>
        </>
    )
}
export default App
