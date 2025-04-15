import IndexWheel from "./IndexWheel"
import { useEffect, useRef,useState } from "react";
import FlipUpWithHistory, { goFlipUpWithHistory } from "../../animations/flip/FlipUpWithHistory";
import "../../css/wheel.css"
import React from "react"

  
function Wheel({r,AlbumData}) {

    const [widthFactor,setWidthFactor] = useState(r/(0.07* window.screen.width));
    
    const [heightFactor,setHeightFactor] = useState(1);
   
    const prevSize = useRef({
        width: null,
        height: null
      }); 
    useEffect(()=>{
        // console.log( window.screen.width)
        prevSize.current.width = window.innerWidth;
        prevSize.current.height = window.innerHeight;
    },[])
    
    // console.log(widthFactor,heightFactor,r, Math.min(widthFactor,heightFactor),(0.07* window.screen.width)*Math.min(widthFactor,heightFactor))
    // console.log(factor,r,0.07*window.innerWidth)

    window.addEventListener('resize',(e)=>{
        // console.log('resize',e)
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight; 
        // 计算宽高比例（使用宽度或高度取决于你的需求）
        const widthRatio = currentWidth / prevSize.current.width;
        const heightRatio = currentHeight / prevSize.current.height;
        const r1 = (0.07* window.screen.width)*Math.min(widthFactor,heightFactor)
        // 这里我们取宽度比例作为示例
        // setScale(widthRatio);
        // console.log(currentWidth,5 * r1,currentWidth,widthFactor,heightFactor,Math.min(widthFactor,heightFactor))
        // if(currentWidth < 5 * r1){
        // console.log(widthFactor,widthRatio)
        setWidthFactor((widthFactor)=>{
            return widthFactor * widthRatio
        })
        setHeightFactor((heightFactor)=>{
            return heightFactor * heightRatio
        })
        // 更新存储的尺寸
        prevSize.current = {
            width: currentWidth,
            height: currentHeight
        };  
    })
    //标准
    

    const [mainCurInd,setMainCurInd] = useState(0);
    const lastNumRef = useRef(0);

    useEffect(()=>{
        goFlipUpWithHistory()
    },[mainCurInd])
    
    const handleOnClickBefore = ()=>{  
        lastNumRef.current = mainCurInd;
        setMainCurInd((mainCurInd)=>{
            return mainCurInd-1;
        })
    }

    const handleOnClickNext = ()=>{ 
        lastNumRef.current = mainCurInd;
        setMainCurInd((mainCurInd)=>{
            return mainCurInd+1;
        })
    } 
    
    return (
        <div className="wheel wheel-position">
            <IndexWheel fraction={(mainCurInd+1)/AlbumData.length} r={(0.07* window.screen.width)*widthFactor}/>
            
            <div className="wheel-information" style={{
                '--factor' : widthFactor
            }}>  
                <div className="wheel-wrap wheel-topTitlePos">
                    <span className="wheel-topTitle">{AlbumData[mainCurInd]}</span>
                </div>
                <div className="wheel-row">
                    {
                        mainCurInd > 0 &&  
                        <svg t="1731135319677" class="wheel-information-leftArr wheel-information-arr" onClick={handleOnClickBefore} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9574" width={`${64 *Math.min(widthFactor,heightFactor)}px`} height={`${64 * Math.min(widthFactor,heightFactor)}px`}><path d="M767.7 480.9H207.1l217.7-217.7c12.3-12.3 12.3-32.4 0-44.7l-0.7-0.7c-12.3-12.3-32.4-12.3-44.7 0.1L107 490.3c-12.3 12.3-12.3 32.4 0 44.7l0.6 0.7c0.1 0 0.2 0.1 0.2 0.1l271.1 271.1c12.5 12.5 32.9 12.5 45.4 0s12.5-32.9 0-45.4L206.7 543.9h561c17.3 0 31.5-14.2 31.5-31.5s-14.2-31.5-31.5-31.5z" fill="#2c2c2c" p-id="9575"></path><path d="M864.1 512.6a31.8 31.7 0 1 0 63.6 0 31.8 31.7 0 1 0-63.6 0Z" fill="#2c2c2c" p-id="9576"></path></svg>
                    }
                    <span className="wheel-sum">{AlbumData.length}</span>
                    <div className="wheel-mainCurInd-wrap"> 
                        <FlipUpWithHistory pre={lastNumRef.current + 1} nxt={mainCurInd+1} 
                                spanClassName="wheel-mainCurInd"
                        />
                    </div>
                    {
                        mainCurInd < AlbumData.length - 1 &&   
                        <svg t="1731135351842" class="wheel-information-rightArr wheel-information-arr" 
                                onClick={handleOnClickNext} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10671" width={`${64 *Math.min(widthFactor,heightFactor)}px`} height={`${64 * Math.min(widthFactor,heightFactor)}px`}><path d="M918.6 489.3L646.1 216.8c-12.3-12.3-32.5-12.3-44.8 0l-0.7 0.7c-12.3 12.3-12.3 32.4 0 44.7l218.7 218.7H257.6c-17.3 0-31.5 14.2-31.5 31.5s14.2 31.5 31.5 31.5h560.1L601.2 760.5c-12.5 12.5-12.5 32.9 0 45.4s32.9 12.5 45.4 0l271.1-271.1s0.1-0.1 0.2-0.1l0.7-0.7c12.3-12.3 12.3-32.4 0-44.7z" fill="#2c2c2c" p-id="10672"></path><path d="M97.6 512.6a31.8 31.7 0 1 0 63.6 0 31.8 31.7 0 1 0-63.6 0Z" fill="#2c2c2c" p-id="10673"></path></svg>
                    }
                </div>
                <div className="wheel-wrap wheel-bottomTitlePos">
                    <span className="wheel-bottomTitle">Number</span>
                </div>
            </div>
           
        </div>
    )
}

export default Wheel
