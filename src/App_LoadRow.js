import "./App.css"
import LoadRow from "./animations/Load_row/LoadRow"
import {useEffect} from "react"
function App() {
    useEffect(()=>{
        LoadRow(document.getElementById("rows").children)
    },[])
    return (
        <div id="rows" style={{
            'display':'flex','flexDirection':'row',
            'height':'40px','width':'100vw'
        }}>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
        </div>
    )
}

export default App
