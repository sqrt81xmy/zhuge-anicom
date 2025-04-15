import LoadRow from "./animations/Load_row/LoadRow"
import TypeWriter from "./animations/TypeWriter/Type_writer"
import { useEffect, useState } from "react"

function App() {

    const [click,setClick] = useState(false)
    
    return (
        <>
            <TypeWriter style={{'fontFamily':'华文行楷','fontSize':'30px'}} 
                        cycle={30} infinite={false} animationKey={click} id="ll">
                今天的天真好啊
            </TypeWriter>
            <button onClick={()=>{setClick((click)=>{return !click;})}} style={{'width':'30px','height':'30px'}}></button>
        </>
    )
}

export default App
