import Wheel from "./components/wheel/wheel";

function App() {
    const r = 0.1*window.innerWidth;
    return ( 
        <Wheel r={r} AlbumData={ [ 
             "央三亮","拜见丞相","蓝袖添香","帖子更新"  
       ]}/>
    )
}

export default App
