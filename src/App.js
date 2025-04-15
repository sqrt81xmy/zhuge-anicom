import CanvasEraser from "./components/CanvasEraser/Canvas_Eraser"
// import CanvasEraser from "zhuge-animation"
import "./App.css"
//refrence App style:
// width: 100vw;
// height: 100vh;
// position: relative;
function App() {
    return (
        <div className = "App">
            <CanvasEraser/>
            <img src="/assets/b3.png" className="App-img"/>
        </div>  
    )
}

export default App
