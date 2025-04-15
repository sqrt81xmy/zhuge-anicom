import { useEffect,useRef } from "react";
import "./CanvasEraser.css"
import React from "react"
function CanvasEraser() {
    // console.log("CanvasEraser") 
    const canvasRef = useRef(null);
    // console.log("cancan")
    useEffect(()=>{
        const drawCanvas = ()=>{
            // console.log("ref",canvasRef.current)
            const canvas = canvasRef.current;
            if(canvas){
                canvas.width = window.innerWidth;  // 设置为视口宽度
                canvas.height = window.innerHeight; // 设置为视口高度
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = "white";
                ctx.fillRect(0,0,canvas.width,canvas.height);
            }
        }
        drawCanvas();
    },[])
    //该组件会填满整个容器
    const handleOnMouseMove = (e)=>{   
        // return;
        const canvas = canvasRef.current; 
        if(canvas){
            const ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "destination-out";
            //把这一点的颜色给去掉
            //首先获取x，然后获取y
            const realY = e.clientY;
        //    console.log("realY",realY);  
            // cursorRef.current.style.cursor = 'url("./cursor.png"), auto';
            // console.log("realY",canvas.style.cursor); 
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            // console.log(rect.width,rect.height,canvas.width,canvas.height)
            const x = (e.clientX - rect.left) * scaleX + 46;
            const y = (e.clientY - rect.top) * scaleY + 46;
       //   console.log("mouseMove",ctx);
            //以该点为圆心，半径为40px画一个圆
            ctx.beginPath();
            ctx.arc(x, y, 63, 0, Math.PI*2);
            // ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fill();  
        }
    } 
    return (
        <canvas ref={canvasRef} className="CanvasEraser" onMouseMove={handleOnMouseMove}/>
    )
}

export default CanvasEraser
