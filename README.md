
😍$Welcom \hspace{0.3em}to\hspace{0.3em}the\hspace{0.3em} 
documentation\hspace{0.3em}of\hspace{0.3em}zhuge-anicom$🥰
@[TOC](目录)
 
 ### 🦄Introduction of zhuge-animation
 这是一个基于$react$的组件➕︎动画库，他使用了$threejs$、$GSAP$、$CSS$技术实现了一下下面这些网页中的动画效果和组件，由于我使用的中文字体网站不定期寄掉，所以下面展示的界面未能达到最佳效果，希望您见谅哦~😭
 - 🍉小说网主页
			主要包括了下面这几个组件，您若对这里的某些动画或者组件感兴趣，欢迎与我交流！
			1. 大标题上的扫光效果(动画)
			2. 副标题的打字机效果(动画)
			3. 背景擦(组件)
			4. 初次加载的行(最上面)依次缓慢进入(动画)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/87643d90e60342b3a5c2140189cfdb11.gif#pic_center)

 - 🍒相册空间主页
     这个主页是我使用 $threejs$结合$perlin$噪声实现的，我设计了几种颜色，能使最终呈现效果看起来更佳。比较喜欢蓝色和绿色。体现了亮子品格像翠竹，像松柏一样美好，~~谁能不喜欢亮子呢~~。好久没写文了。只能想起积石如玉，列松如翠了，~~扯远了~~。这里我主要开源了：
     1.  $perlin$噪声背景(组件，支持自定义颜色)
     2. 鼠标移动显示图片(动画)
     3. 左下角计数器和外圆环(组件)
    ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/89ee2f4d577840f7921fb68052f4ee03.gif#pic_center)

 - 🥑相册
    这个网页是我使用$threejs$结合$GSAP$动画库开发的，里面有很多亮子的照片，~~太美了~~ 。这里的图片由于是用 $thrrejs$实现的，因此您不能再使用传统的$css$控制图片形状了。这个网页我主要开源的是：
    1. 图片悬浮后的粒子动效(动画)
 
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/bc288b128ef14626bd50bf3eab0279f0.gif#pic_center)
         2. 点击图片后的扭一扭+放大+位置改变动画(使用$threejs$实现)，三个动画分别开源![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/a55f3dbcf0204f56a507c5630e963eee.gif#pic_center)

$tips$:这些网页目前为个人作品，由于未全部完成尚未开源😝。待全部完成后，将会进行上线。您可以借鉴网页的界面设计等，因为这些网页也只是我模仿优秀作品的练习。若您有任何问题，可在本贴下留言或前往$Github$提$issue$!
组件库源码的仓库地址为： [https://github.com/sqrt81xmy/zhuge-anicom](https://github.com/sqrt81xmy/zhuge-anicom)
测试代码仓库地址为：[https://github.com/sqrt81xmy/zhuge-anicom-test](https://github.com/sqrt81xmy/zhuge-anicom-test)
### 🦢一、安装以及配置

```powershell
npm install zhuge-anicom
```
由于[$issue1790$](https://github.com/resend/react-email/issues/1790)的存在，如果您需要使用$perlin$噪声背景组件和图片粒子动画，您需要确保下面的结果是$production$

```javascript
console.log(process.env.NODE_ENV) //production
```
我的推荐方法是：

```powershell
npm run build
serve -s build
```

### 🌶️二、组件和动画的使用方法
#### 组件篇

 1. 🚒$Canvas\hspace{0.3em}Eraser$
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/8eca9d7d4419429f8f41f24345686a2e.gif#pic_center)

您可以将$Canvas\hspace{0.3em}Eraser$搭配底图使用，就会出现滑动擦除上层颜色，之后显现出下层图片，参考示例代码如下:

```javascript
import {CanvasEraser} from "zhuge-anicom"
//refrence App style:
//.App:
// width: 100vw;
// height: 100vh;
// position: relative;
//.App-img{
//    z-index: -1;
//    width: 100vw;
//    height: 100vh;
//    position: absolute;
//    left: 0;
//    top: 0;
//}
function App() {
    return (
        <div className = "App">
            <CanvasEraser/>
            <img src="/assets/b3.png" className="App-img"/>
        </div>  
    )
}

export default App

```
$PS:$ 苯人爱$base64$，打包的时候只能靠他惹。图片找不到路径，$webpack$的转$base64$能转错，只能自己转，服啦。最高端的食材往往只需要最朴素的烹饪方式。

2. 🚚粒子浮动图片组件 $PointsImage$
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/b86875cd0edd419299bb552786ef95be.gif#pic_center)

	该图片为$threejs$下的图片。参数介绍：$texturePath$是图片链接。您可以通过调整$position$来控制图片位置，调整$scaleImg$来控制图片大小，通过$poinstNum$调整像素数，第一个参数为水平方向/$width$。$pointsImgRef$是一个需要传入的$useRef$变量，设置$needPoints$为$false$可以关闭粒子动画。
	其中`position=[-0.8, -0.6],
    scaleImg=[1.0, 0.6],pointsNum=[100,100]`为默认值。若动画效果卡顿，可以尝试降低像素数量。
```javascript
import "./App.css"
import a1 from "./assets/b3.png"
import {PointsImage} from "zhuge-anicom"
import {Wrap} from "zhuge-anicom" 
import { useRef, useState } from "react" 
function App() {
    //you can change the position: [x,y,z]
    //you can rescale the img
    //you can set the poinstsNum when you change the scale of the image
    //You must wrap the PointsImage using wrap, one `wrap` can wrap multiple images.
    const pointsImgRef = useRef(null);  
    const [big,setBig] = useState(true);
 
    //we do not recommand you to just use the pointsImgRef to operate sth, 
    //it just a virtual ref for us to access some private variable in the `PointsImage`
    return ( 
        <Wrap >
             <PointsImage texturePath={a1} needsPoints={true}
                position={[0, 0]}  pointsImgRef={pointsImgRef}
                scaleImg={[1.6*1.15, 1.2*1.1*1.04]} pointsNum={[320,250]}  
                />  
        </Wrap> 
    )
}

export default App

```
由于[$issue1790$](https://github.com/resend/react-email/issues/1790)的存在，如果您需要使用该组件，您需要确保下面的结果是$production$

```javascript
console.log(process.env.NODE_ENV) //production
```
我的推荐方法是：

```powershell
npm run build
serve -s build
```
3. 🛶对应的扭一扭动画，我们设置了三个动画
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/a39bf039d17f40699ecbb38bcab1ef7b.gif#pic_center)

`usePointsImgScale/usePointsImgSin/usePointsImgPosition`+一个合并动画`usePointsImgClick `。由于放缩前后有像素上的差异，我们一般推荐在放大或者缩小之后，立即调整图片的像素大小，使用`usePointsImgUnmount`函数。
使用方法：
	1. 先注册钩子，返回调用函数 `const handleOnScale = usePointsImgScale();`
	2. 调用函数 `handleOnScale(pointsImgRef,{x:1.0, y:0.6},0,1.6);`
	3. 参数介绍 ：第一个参数为$PointsImage$的$ref$变量，第二个参数为改变后的状态。应用函数的动作为从当前状态到目标状态的过程。这个过程的延时$delay$和时间为$duration$分别是第三和第四两个参数，其中$duration$不包括$delay$，单位为秒。`handleOnUnmount`为同步函数，无动画。前面三个函数全部是异步的，调用时不用写 $async$声明。

```typescript
const handleOnSin: (pointsImgRef: any, delay: any, duration: any) => void
const handleOnScale: (pointsImgRef: any, scale: any, delay: any, duration: any) => void
const handleOnPosition: (pointsImgRef: any, position: any, delay?: number, duration?: number) => void
const handleOnUnmount: (pointsImgRef: any, pointsNum: any) => void
```
如果您想将图片分布在不同的容器上，只需要添加$Wrap$即可，示例代码：
```javascript
import "./App.css"
import a1 from "./b3.png"
import {PointsImage} from "zhuge-anicom"
import {Wrap} from "zhuge-anicom"
// import usePointsImgClick from "./animations/PointsImgClick/PointsImgClick"
import { useRef, useState } from "react"
import {usePointsImgScale} from "zhuge-anicom"
import {usePointsImgSin} from "zhuge-anicom"
import {usePointsImgUnmount} from "zhuge-anicom"
import {usePointsImgPosition} from "zhuge-anicom"
function App() {
    //you can change the position: [x,y,z]
    //you can rescale the img
    //you can set the poinstsNum when you change the scale of the image
    //You must wrap the PointsImage using wrap, one `wrap` can wrap multiple images.
    const pointsImgRef = useRef(null);
    const pointsImgRef1 = useRef(null);
    // const handleOnClick = usePointsImgClick();
    const [big,setBig] = useState(true);

    const handleOnScale = usePointsImgScale();
    const handleOnSin = usePointsImgSin();
    const handleOnUnmount = usePointsImgUnmount();
    const handleOnPosition = usePointsImgPosition();
    const handleOnClick = ()=>{
        handleOnSin(pointsImgRef,0,1.6)
        handleOnScale(pointsImgRef,{x:1.0, y:0.6},0,1.6);
        handleOnPosition(pointsImgRef,{x:-0.8, y:-0.6},1.6,1.6)
        handleOnUnmount(pointsImgRef,[200,150])
    }


    //we do not recommand you to just use the pointsImgRef to operate sth, 
    //it just a virtual ref for us to access some private variable in the `PointsImage`
    return ( 
        <Wrap >
             <PointsImage texturePath={a1} needsPoints={true}
                position={[0, 0]}  pointsImgRef={pointsImgRef}
                scaleImg={[1.6*1.15, 1.2*1.1*1.04]} pointsNum={[320,250]} 
                // handleOnClick={()=>{
                //     if(big)
                //         handleOnClick(pointsImgRef,{x:-0.8, y:-0.6},{x:1.0, y:0.6},[200,150])
                //     else
                //         handleOnClick(pointsImgRef,{x:0, y:0},{x:1.6*1.15, y:1.2*1.1*1.04},[320,250]) 
                //     setBig((big)=>{
                //         return !big;
                //     })
                // }}
                handleOnClick={handleOnClick}
                /> 
            {/* <PointsImage texturePath={a1} 
            position={[-0.8, -0.6]}  pointsImgRef={pointsImgRef}
            scaleImg={[1.0, 0.6]} pointsNum={[220,100]} 
            handleOnClick={()=>handleOnClick_grow({pointsImgRef:pointsImgRef,position:{x:0,y:0}})}/>  */}
            {/* <PointsImage texturePath={a1} 
            position={[0.8, 0]}  pointsImgRef={pointsImgRef1}
            scaleImg={[1.0, 0.6]} pointsNum={[220,100]} 
            handleOnClick={()=>handleOnClick_grow({pointsImgRef:pointsImgRef1,position:{x:0,y:0}})}/>  */}
        </Wrap> 
    )
}

export default App


```
由于[$issue1790$](https://github.com/resend/react-email/issues/1790)的存在，如果您需要使用该组件，您需要确保下面的结果是$production$

```javascript
console.log(process.env.NODE_ENV) //production
```
我的推荐方法是：

```powershell
npm run build
serve -s build
```
4. 🌏$PerlinBackground$
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/19743fb4f1c044c09b18353a342bc80d.gif#pic_center)

这个组件中，您可以自行设置背景的颜色。颜色中一共有两个值需要设计，分别是$uLowColor$和$uHighColor$。其中$uHighColor$是浮动颜色，$uLowColor$是底色。
参数说明：
1.$id$是在$bgColor\_def$应该显示的颜色索引
2.$bgColor\_def$是颜色数组
$tips$:如果有内边距影响，您可以尝试将$body$的$margin$写成$0$

由于[$issue1790$](https://github.com/resend/react-email/issues/1790)的存在，如果您需要使用该组件，您需要确保下面的结果是$production$

```javascript
console.log(process.env.NODE_ENV) //production
```
我的推荐方法是：

```powershell
npm run build
serve -s build
```
示例代码：

```javascript
import { Background } from "zhuge-anicom"
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
    // process.env.NODE_ENV = "production"
    console.log(process.env.NODE_ENV)
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
                    uLowColor:{ value:  new THREE.Color(255/255,237/255,209/255) }
                }
            ]}/>
        </div>
    )
}

export default App

```
5. ⛰️$IndexWheel$
位置设置：通过设置$.wheel-position$(类名)来设置
参数设置：第一个参数$r$为半径(将传入$svg$)，第二个参数为$title$，是滑轮上面的标题。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c1b9937e71b34ca2bb2cdeb49f762c50.gif#pic_center)

示例代码：

```javascript
import { Wheel } from "zhuge-anicom";

function App() {
    const r = 0.1*window.innerWidth;
    return ( 
        <Wheel r={r} AlbumData={ [ 
             "星期一","星期二","星期三","星期四"  
       ]}/>
    )
}

export default App

```

#### 动画篇

 1.🖖 $Float\hspace{0.3em}Image$
 	  在您需要放置图片的父容器上使用$handleMouseMove$，初始化的第一个参数是父容器类名，第2个参数是所有图片组成的数组，第三个参数是图片的样式
 	  ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/ed7581bc99cc4291acf3e2781f3a841c.gif#pic_center)

 	 示例代码：

```javascript
import {useFloatImg} from "zhuge-anicom"
import a1 from "./b3.png"
import a2 from "./logo192.png" 
import "./App.css"
function App() {
     //rootClassName是图片应该被放到的container上的
    //确保图片链接能被img.src访问到 
    //the third param should be a dictionary or a map
    const mp = new Map()
    mp.set('width','400px') 
    const handleMouseMove = useFloatImg("App",[a1,a2],mp)
    return (
        <div className="App" onMouseMove={handleMouseMove}>
            
        </div>
    )
}

export default App

```
2. ✍️扫光效果
您需要将文字传入作为$children$传入组件，您可以将该组件想象成`<span>`，然后设计$style$即可，最后会以您设计的样式为准。下面介绍中的$infinite\_interact$、 $animationKey$、$delay$、$cycle$、$animationDirection$为参数。
该组件设计了交互式与循环式两种方法做动画，$infinite\_interact$为$true$时，为无限循环播放动画；为$false$时，将 $animationKey$设置为$state$变量，每次该变量改变时，动画播放。$delay$是播放延迟时间，$cycle$为播放时间，包括$delay$。如果$delay$大于$cycle$，会将$delay$对$cycle$取模。我们设置了4种光线运动方向，使用$animationDirection$进行设置，其值为：$"left2right"/"right2left"/"top2down"/"down2top"$，$"left2right"$是从左到右播放，其余同理。$lightAngle$为光线倾斜方向。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/7064ef762c614e97a1d8a8de656c6382.gif#pic_center)
示例代码：

```javascript
import {LightSweep} from "zhuge-anicom"
import { useState } from "react"
function App() {
    //If you want to control the animation, just use the state variable as the animationKey
    //you can choose the `infinite` and the `interact` version
    //you can choose the direction : "left2right"/"right2left"/"top2down"/"down2top"
    //you can set the speed of the animation using `delay` and `cycle`
    //you can set the style and we will merge your style and our style
    const [click,setClick] = useState(false)
    
    return (
        <>
            <LightSweep 
                animationKey={click}
                animationDirection="left2right"
                lightAngle="45deg"
                cycle={4}
                delay={6} 
                infinite_interact={false} 
                style={{'fontSize':'30px',flexWrap:'wrap','display':'flex'}}>
                今天的天可真蓝
            </LightSweep>
            <button onClick={()=>{setClick((click)=>{return !click})}} style={{'width':'30px',height:'30px'}}></button>
        </>
    )
}
export default App

```
3. 🌸打字机效果
打字机实际是一个`<span>`标签，形如：

```javascript
 <span className={className + " TypeWriter"} style={style} key={animationKey} id={id} >
            {children}
        </span>
```

参数介绍：
1.$children$
	放在`<span>`标签中的文字
2.$style$
   为打字机的字体设置的样式
3.$cycle$
  动画周期               
 4.$infinite$ $animationKey$
     这是一个布尔变量，如果你设置为$false$，那么你可以与其交互，只需要将$animationKey$写成$state$变量就可以。 如果该变量为$true$，那么$animationKey$为常量 
 5.$id$，$className$
 同一般$html$用法，会加在`<span>`标签上
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/80a021ff813a480299fcdb05ac10f4c5.gif#pic_center)

示例代码：

```javascript
 
import {TypeWriter} from "zhuge-anicom"
import { useEffect, useState } from "react"

function App() {

    const [click,setClick] = useState(false)
    
    return (
        <>
            <TypeWriter style={{'fontFamily':'华文行楷','fontSize':'30px'}} 
                        cycle={3} infinite={false} animationKey={click} id="ll">
                今天的天真好啊
            </TypeWriter>
            <button onClick={()=>{setClick((click)=>{return !click;})}} style={{'width':'30px','height':'30px'}}></button>
        </>
    )
}

export default App

```

 4. 🐳$LoadRow$效果
 触发函数：$LoadRow$
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/ce7666b111df455f8ce70f8a223ef8f4.gif#pic_center)

 请参考示例代码:
 

```javascript
import "./App.css"
import {LoadRow} from "zhuge-anicom"
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

```
5. 🚄上翻效果
 (1). 多行上翻，动画触发函数为`goFlipUpWithOcclusionMultiLines` ，组件为`FlipUpWithOcclusionMultiLines `，组件参数有`text`和`cnt`，`text`为字符串，`cnt`为每行的长度。您可以通过`spanClassName`和`containerClassName`参数设置`<span>`样式效果
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/5532d812303c439fa1ef054231446511.gif#pic_center)

示例代码：

```javascript
import "./App.css" 
import {FlipUpWithOcclusionMultiLines,goFlipUpWithOcclusionMultiLines} from "zhuge-anicom"
function App() { 
    const handleOnClick = ()=>{
        goFlipUpWithOcclusionMultiLines()
    }
    return (
        <div className="App">
            <FlipUpWithOcclusionMultiLines text={"今天的天可真蓝啊今天的天可真蓝啊"} cnt={8}/>
            <button onClick={handleOnClick}></button>
        </div>
    )
}

export default App

```
(2).单行上翻
参数说明：通过`text`传入文本，通过`wrapClassName`,`spanClassName`设置容器样式和字体样式。
触发函数：`goFlipUpWithOcclusion`
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/9ed6f8334d7a43719c5d31477bdc2cb3.gif#pic_center)

示例代码：

```javascript
import "./App.css"
import {FlipUpWithOcclusion,goFlipUpWithOcclusion} from "zhuge-anicom"
function App() { 
    const handleOnClick = ()=>{
        goFlipUpWithOcclusion()
    }
    return (
        <div className="App"> 
            <FlipUpWithOcclusion text="今天的天可真蓝啊"/>
            <button onClick={handleOnClick}></button>
        </div>
    )
}

export default App

```
