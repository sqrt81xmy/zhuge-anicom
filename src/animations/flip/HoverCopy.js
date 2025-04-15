import "./HoverCopy.css"
import React from "react"
function HoverCopy({text,handleOnClick}) {
    return (
        <span className="HoverCopy"
                style={{
                    "--content":`"${text}"` //注意这块不能写成`${text}`，否则认为text未定义，笑死
                }}
                onClick={handleOnClick}
        >
            {text}
        </span> 
    )
}

export default HoverCopy
