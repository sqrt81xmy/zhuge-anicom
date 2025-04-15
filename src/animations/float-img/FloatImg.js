import { useRef } from "react";
import gsap from "gsap-trial"
import React from "react"
function useFloatImg(rootClassName,candidateImg,imgStyle) {  
    const moveTimeRef = useRef(null);
    const cntRef = useRef(0);
    const previousCursor = useRef({x:null,y:null});

    const handleMouseMove = (e)=>{  
        //设计一个节流
        if(moveTimeRef.current != null){
            return ;
        }
        moveTimeRef.current = setTimeout(()=>{
            moveTimeRef.current = null;
        },460);
        // console.log("e.x e.y",e.clientX,e.clientY); 鼠标移动的坐标点
        
        //下面获取鼠标移动的向量
        // const vectorX = e.clientX - lastMoveX.current;
        // const vectorY = e.clientY - lastMoveY.current;
        //让3个球往这边移动一点：
        // gsap.to(".animation-ball", {  y: 0.03 * vectorY, x: 0.03 * vectorX,
        //     duration: 0.6, opacity:1 });

        //下面获取坐标x、y,在这个坐标上放一些图片
        const x = e.clientX;
        const y = e.clientY;
        // console.log(x,0.77*window.innerWidth,x>0.77*window.innerWidth,y,window.innerHeight-0.18*window.innerWidth,y>0.82*window.innerWidth)
        // if(x>0.73*window.innerWidth&&y>window.innerHeight-0.22*window.innerWidth){
        //     console.log("return;")
        //     return ;//右下角按钮
        // }
        // if(x<0.23*window.innerWidth && y>window.innerHeight-0.18*window.innerWidth){
        //     console.log("return;")
        //     return;//左下角按钮
        // }
        if(previousCursor.current.x){
            const preX = previousCursor.current.x;
            const preY = previousCursor.current.y;
            const dis = Math.abs(preX-x) + Math.abs(preY-y);
            // console.log(dis);
            if(dis<30){
                return ;
            } 
        }
        previousCursor.current.x = x;
        previousCursor.current.y = y;
        const img = document.createElement('img');
        const array = candidateImg;
        const len = array.length;
        const cur = cntRef.current;
        cntRef.current = cur+1;
        const src = array[cur%len];
        img.src = src;
        img.style.position = 'fixed';
        img.style.top = `${y}px`;
        img.style.left = `${x}px`;
        img.style.width = '15%';
        img.style.height = '20%';
        img.style.borderRadius = '20px'; 
        // img.style.transitionDuration = '1s';
        img.style.opacity = 0.7;
        img.style.transform = 'scale(0.5)';
        // 判断是否是Map类型
        const isMap = imgStyle instanceof Map;
        
        // 获取键集合
        const keys = isMap ? [...imgStyle.keys()] : Object.keys(imgStyle);
        
        for (const key of keys) {
            // 获取值
            const value = isMap ? imgStyle.get(key) : imgStyle[key]; 
            img.style.setProperty(key, value);
            // console.log(key,imgStyle[key],imgStyle.get(key),img.style)
        }
        const parent = document.getElementsByClassName(rootClassName)[0];
        parent.appendChild(img); 
        // img.style.opacity = 1;
        // setTimeout(()=>{

        // },)
        gsap.to(img,
            {duration: 0.8,scaleX:1,scaleY:1,opacity:1})
        setTimeout(()=>{ 
            gsap.to(img,
                {duration: 0.5,scaleX:0.5,scaleY:0.5,opacity:0})
            setTimeout(()=>{
                parent.removeChild(img);
            },500) 
        },1000)
    }
    return handleMouseMove
}

export default useFloatImg
