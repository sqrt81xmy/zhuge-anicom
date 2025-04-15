import Background from "./components/BackgroundPerlin/Background"
import "./App.css"
import * as THREE from 'three'
//reference App style
// position: absolute;
// top: 0;
// left: 0;
// width: 100vw;
// height: 100vh;
// z-index: -1;

function App() {


    //you can use the five color we offered you 
    //or you can use the color you designed yourself
    //id means the index of the color
    //if you want to change it, just make the id as state variable.
    //the color we offered is as below, if you want to design the color, you should follow the below format.
    // [
    //     {
    //          uHighColor:{ value: new THREE.Color(107/255,166/255,230/255) },  
    //          uLowColor:{ value: new THREE.Color(194/255,228/255,255/255) }, 
    //     },
    //     {
    //         uHighColor:{ value: new THREE.Color(255/255,163/255,163/255) },  
    //         uLowColor:{ value:  new THREE.Color(255/255,219/255,219/255) },
    //     },
    //     {
    //         uHighColor:{ value: new THREE.Color(255/255,205/255,163/255) },  
    //         uLowColor:{ value:  new THREE.Color(255/255,237/255,209/255) },
    //     },
    //     {
    //         uHighColor:{ value: new THREE.Color(137/255,206/255,178/255) },  
    //         uLowColor:{ value:  new THREE.Color(219/255,255/255,232/255) },
    //     },
    //     {
    //         uHighColor:{ value: new THREE.Color(206/255,183/255,240/255) },  
    //         uLowColor:{ value:  new THREE.Color(253/255,219/255,255/255) },
    //     }
    // ]


    return (
        <div className="App">
            <Background id={0} bgColor_def={[
                 {
                    uHighColor:{ value: new THREE.Color(255/255,205/255,163/255) },  
                    uLowColor:{ value:  new THREE.Color(255/255,237/255,209/255) },
                }
            ]}/>
        </div>
    )
}

export default App
