const vertexShader =   
'#ifdef GL_ES\n'+
'precision mediump float;\n' +
'#endif\n' + /*glsl*/` 
// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
uniform vec2 uFrequency;  
uniform float uScroll;
uniform float positionDeltaX;
uniform float uTime;
uniform sampler2D uIntensityTexture;
uniform sampler2D uTexture;
uniform vec2 uResolution;
attribute float aRandom;
attribute float aIRandom;
varying float vRandom;

varying vec2 vUv; 
varying vec3 vPosition;
varying vec3 vColor;


uniform float scrollUpFlag;
uniform float uScrollNoSin;
uniform float uScrollSin;

uniform float uMaxPositionX;

// void dealScroll(){
//     if(scrollUpFlag == 1){
//         if( uScrollSin >  deltaScroll &&
//             recTime <  timeThrehold
//             ){ 
//             uScrollSin -= deltaTime * frequency;
//             // console.log(this.recTime,this.uniforms.get('uScrollSin').value,deltaTime ) 
//         }
//         else if(
//             uScrollSin <=  deltaScroll && 
//             recTime < timeThrehold
//             ){ 
//             recTime += deltaTime * frequency;
//         } 
//         //         //这里的deltaTime相当于一个常量
//         // }  //让角度收回的时候y位置做匀减速运动
//         else if(
//             recTime >= timeThrehold && 
//             frequency > 0.0
//             ){  

//                 // this.uniforms.get('uScrollSin').value = 0.0;
//                 //这里需要做一个减加速度运动
//                 //x = （0.1 * freq * deltaTime)*t -> x' = (0.1 * freq * deltaTime)
//                 //减加速度运动 v -= a * t -> 0.1*(freq-a)*deltaTime
//                 //这里让a和freq是一个数量级 
//                 // delta(x) = 0.1(freq-a)*deltaTime
//                 if(uScrollSin+deltaTime * fixFrequency <= 0.0)
//                     uScrollSin += deltaTime * fixFrequency;
//                 frequency -= accelerator; //速度匀减速
//             uScrollNoSin -= frequency * 0.09 * deltaTime; //位移加
//         }
//         else if(
//             recTime >= timeThrehold && 
//             frequency <= 0.0)
//         {
//             console.log(5) 
//             recTime = 0;
//             scrollUpFlag = 0;
//             lastNoSin = uScrollNoSin;
//             this.frequency = 7.0;
//         }
//     }
    
// }


float modRange(float x, float minVal, float maxVal) {
    float rangeSize = maxVal - minVal; // 计算范围大小
    // 将 x 移动到范围 [0, rangeSize]
    float adjustedX = x - minVal;
    
    // 取模运算处理
    adjustedX = mod(adjustedX, rangeSize);
    
    // 返回到原始范围
    return adjustedX + minVal;
}

void main(){ 
  
    // float evaluationZ = cos((newPosition.x)*3.1415)*uScroll;
    // newPosition.z = evaluationZ;
    // float evaluationX = abs(newPosition.x)*(newPosition.x)*3.1415*uScroll*0.1;
    // newPosition.x -= evaluationX;

    // float theta = abs(1.0-position.x) * uScroll * 0.5;
    // newPosition.z -= abs(position.x)*uScroll*0.5;
    // // newPosition.x *= ( cos(theta)*0.5);
    // newPosition.y -= position.x*uScroll*0.2; 
    // newPosition.x += uScroll * 0.1;
    // newPosition.z += (newPosition.x*newPosition.x - newPosition.y*newPosition.y)*uScroll*2.0;
    // float factor = newPosition.x / abs(newPosition.x);
    // newPosition.y *= (1.0-(uScroll*sin(newPosition.x)*0.5));
   
   // newPosition.y += -(cos(2.7 * newPosition.x) * uScroll *0.4);
    //newPosition.y += uScroll;
    
    // float xRandom = fract(sin(position.x * 1000.0 + uTime) * 43758.5453); // 改良随机数生成
    float interactiveTense = texture2D(uIntensityTexture,uv).r;
    interactiveTense = smoothstep(0.1,0.3,interactiveTense);
    vec3 AddVec = vec3(0.2*sin(aRandom),0.2*cos(aRandom),0)*interactiveTense*0.4*aIRandom;
    // float deltaX = sin(x)/20.0;

 

    vec4 modelPosition = modelMatrix * vec4(position+AddVec,1.0);  
    //把这里放开
    float deltaySin =  ((cos((modelPosition.x/uMaxPositionX) * 3.2) * 0.1)*uScrollSin);
    modelPosition.x += sin(modelPosition.y*6.4+uTime) * uTime / 25.0;
    modelPosition.y += uScrollNoSin;
    modelPosition.z += deltaySin;

    modelPosition.y = modRange(modelPosition.y, -1.2, 1.2);

   
    //把上面放开
    // vec4 newPosition = modelPosition; 

    // modelPosition.x += deltaX;
    // modelPosition.y += deltaX;
   
    // newPosition.x += positionDeltaX;
    // newPosition.z += (cos(0.1 * newPosition.x) *0.4);
    // modelPosition.x += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
    // modelPosition.y += evaluation;
   
    // float elevation = sin(modelPosition.x*5.0  - uTime*0.5) * 0.1;
    // modelPosition.z += elevation;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix *viewPosition;
    gl_Position = projectedPosition;

    // float tense = texture(uTexture,uv).r;
    gl_PointSize = 0.006  * uResolution.y;
    gl_PointSize *= (1.0 / (- viewPosition.z));
    // gl_PointSize = 3.0;
    // float intensity = texture(uDisplacementT/exture,uv).r; 
    vUv = uv; 
    vRandom = aRandom;
    vColor = texture(uTexture,uv).rgb;
}`

export default vertexShader;