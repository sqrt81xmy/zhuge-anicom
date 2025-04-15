import { useEffect } from "react"
import "./TypeWriter.css"
import React from "react"
function TypeWriter({children,style,
                cycle = 14,
                infinite = true, //if you set this as false,then you can interact with this animation.
                animationKey = 1,id="",className // if you want to interact with this animation, then set this variable as state-variable
               }) {
    
    // console.log(typeof children,children.length)
    
    const typeWriterStyle = {
        '--TypeWriter-textLength':children.length,
        '--TypeWriter-fontSize': style.fontSize ? style.fontSize : '16px',
        '--TypeWriter-cycle':cycle+'s',
        '--TypeWriter-infinite': infinite ? "infinite" : 1,
        '--TypeWriter-blinkTimes': infinite ? "infinite" : Math.floor(cycle/0.75/2  )
    }

    if(style){
        style = {...style,...typeWriterStyle}
    }
    else{
        style = typeWriterStyle
    }

    return (
        <span className={className + " TypeWriter"} style={style} key={animationKey} id={id} >
            {children}
        </span>
    )
}

export default TypeWriter
