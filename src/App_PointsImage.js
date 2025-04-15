import "./App.css"
import a1 from "./assets/b3.png"
import PointsImage from "./components/PointsImage/PointsImage"
import Wrap from "./components/BackgroundPerlin/threejsWrap"
import usePointsImgClick from "./animations/PointsImgClick/PointsImgClick"
import { useRef, useState } from "react"
import usePointsImgScale from "./animations/PointsImgClick/PointsImgScale"
import usePointsImgSin from "./animations/PointsImgClick/PointsImgSin"
import usePointsImgUnmount from "./animations/PointsImgClick/PointsImgUnmount"
import usePointsImgPosition from "./animations/PointsImgClick/PointsImgPosition"
function App() {
    //you can change the position: [x,y,z]
    //you can rescale the img
    //you can set the poinstsNum when you change the scale of the image
    //You must wrap the PointsImage using wrap, one `wrap` can wrap multiple images.
    const pointsImgRef = useRef(null);
    const pointsImgRef1 = useRef(null);
    // const handleOnClick = usePointsImgClick();
    const [big,setBig] = useState(true);

    const handleOnScale = usePointsImgScale();
    const handleOnSin = usePointsImgSin();
    const handleOnUnmount = usePointsImgUnmount();
    const handleOnPosition = usePointsImgPosition();
    const handleOnClick = ()=>{
        handleOnSin(pointsImgRef,0,1.6)
        handleOnScale(pointsImgRef,{x:1.0, y:0.6},0,1.6);
        handleOnPosition(pointsImgRef,{x:-0.8, y:-0.6},1.6,1.6)
        handleOnUnmount(pointsImgRef,[200,150],)
    }


    //we do not recommand you to just use the pointsImgRef to operate sth, 
    //it just a virtual ref for us to access some private variable in the `PointsImage`
    return ( 
        <Wrap >
             <PointsImage texturePath={a1} needsPoints={true}
                position={[0, 0]}  pointsImgRef={pointsImgRef}
                scaleImg={[1.6*1.15, 1.2*1.1*1.04]} pointsNum={[320,250]} 
                // handleOnClick={()=>{
                //     if(big)
                //         handleOnClick(pointsImgRef,{x:-0.8, y:-0.6},{x:1.0, y:0.6},[200,150])
                //     else
                //         handleOnClick(pointsImgRef,{x:0, y:0},{x:1.6*1.15, y:1.2*1.1*1.04},[320,250]) 
                //     setBig((big)=>{
                //         return !big;
                //     })
                // }}
                handleOnClick={handleOnClick}
                /> 
            {/* <PointsImage texturePath={a1} 
            position={[-0.8, -0.6]}  pointsImgRef={pointsImgRef}
            scaleImg={[1.0, 0.6]} pointsNum={[220,100]} 
            handleOnClick={()=>handleOnClick_grow({pointsImgRef:pointsImgRef,position:{x:0,y:0}})}/>  */}
            {/* <PointsImage texturePath={a1} 
            position={[0.8, 0]}  pointsImgRef={pointsImgRef1}
            scaleImg={[1.0, 0.6]} pointsNum={[220,100]} 
            handleOnClick={()=>handleOnClick_grow({pointsImgRef:pointsImgRef1,position:{x:0,y:0}})}/>  */}
        </Wrap> 
    )
}

export default App
