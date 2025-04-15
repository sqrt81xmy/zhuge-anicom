import useFloatImg from "./animations/float-img/FloatImg"
import a1 from "./b3.png"
import a2 from "./logo192.png" 
import "./App.css"
function App() {
     //rootClassName是图片应该被放到的container上的
    //确保图片链接能被img.src访问到 
    //the third param should be a dictionary or a map
    const mp = new Map()
    mp.set('width','400px')
    console.log(Object.keys(mp),mp,mp.keys)
    for(let key of mp.keys()){
        console.log(key)
    }
    const handleMouseMove = useFloatImg("App",[a1,a2],mp)
    return (
        <div className="App" onMouseMove={handleMouseMove}>
            
        </div>
    )
}

export default App
