const Perlin =
'#ifdef GL_ES\n'+
'precision mediump float;\n' +
'#endif\n'+ /*glsl*/` 
//
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2024-11-07
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

varying vec2 vUv;//receive variable from vertex
uniform float uTime;
uniform vec3 uHighColor;
uniform vec3 uLowColor; 
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;
uniform vec3 uColor8;
uniform vec3 uColor9;
uniform vec3 uColor10;
uniform vec3 uColor0;
uniform sampler2D uDisplacementTexture;


vec3 mod289(vec3 x)
{
 return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
 return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
 return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
 return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
 return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec3 P)
{
 vec3 Pi0 = floor(P); // Integer part for indexing
 vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
 Pi0 = mod289(Pi0);
 Pi1 = mod289(Pi1);
 vec3 Pf0 = fract(P); // Fractional part for interpolation
 vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
 vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
 vec4 iy = vec4(Pi0.yy, Pi1.yy);
 vec4 iz0 = Pi0.zzzz;
 vec4 iz1 = Pi1.zzzz;

 vec4 ixy = permute(permute(ix) + iy);
 vec4 ixy0 = permute(ixy + iz0);
 vec4 ixy1 = permute(ixy + iz1);

 vec4 gx0 = ixy0 * (1.0 / 7.0);
 vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
 gx0 = fract(gx0);
 vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
 vec4 sz0 = step(gz0, vec4(0.0));
 gx0 -= sz0 * (step(0.0, gx0) - 0.5);
 gy0 -= sz0 * (step(0.0, gy0) - 0.5);

 vec4 gx1 = ixy1 * (1.0 / 7.0);
 vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
 gx1 = fract(gx1);
 vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
 vec4 sz1 = step(gz1, vec4(0.0));
 gx1 -= sz1 * (step(0.0, gx1) - 0.5);
 gy1 -= sz1 * (step(0.0, gy1) - 0.5);

 vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
 vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
 vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
 vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
 vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
 vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
 vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
 vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

 vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
 vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));

 float n000 = norm0.x * dot(g000, Pf0);
 float n010 = norm0.y * dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
 float n100 = norm0.z * dot(g100, vec3(Pf1.x, Pf0.yz));
 float n110 = norm0.w * dot(g110, vec3(Pf1.xy, Pf0.z));
 float n001 = norm1.x * dot(g001, vec3(Pf0.xy, Pf1.z));
 float n011 = norm1.y * dot(g011, vec3(Pf0.x, Pf1.yz));
 float n101 = norm1.z * dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
 float n111 = norm1.w * dot(g111, Pf1);

 vec3 fade_xyz = fade(Pf0);
 vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
 vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
 float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
 return 2.2 * n_xyz;
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
 vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
 vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
 Pi0 = mod289(Pi0);
 Pi1 = mod289(Pi1);
 vec3 Pf0 = fract(P); // Fractional part for interpolation
 vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
 vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
 vec4 iy = vec4(Pi0.yy, Pi1.yy);
 vec4 iz0 = Pi0.zzzz;
 vec4 iz1 = Pi1.zzzz;

 vec4 ixy = permute(permute(ix) + iy);
 vec4 ixy0 = permute(ixy + iz0);
 vec4 ixy1 = permute(ixy + iz1);

 vec4 gx0 = ixy0 * (1.0 / 7.0);
 vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
 gx0 = fract(gx0);
 vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
 vec4 sz0 = step(gz0, vec4(0.0));
 gx0 -= sz0 * (step(0.0, gx0) - 0.5);
 gy0 -= sz0 * (step(0.0, gy0) - 0.5);

 vec4 gx1 = ixy1 * (1.0 / 7.0);
 vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
 gx1 = fract(gx1);
 vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
 vec4 sz1 = step(gz1, vec4(0.0));
 gx1 -= sz1 * (step(0.0, gx1) - 0.5);
 gy1 -= sz1 * (step(0.0, gy1) - 0.5);

 vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
 vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
 vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
 vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
 vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
 vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
 vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
 vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

 vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
 vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));

 float n000 = norm0.x * dot(g000, Pf0);
 float n010 = norm0.y * dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
 float n100 = norm0.z * dot(g100, vec3(Pf1.x, Pf0.yz));
 float n110 = norm0.w * dot(g110, vec3(Pf1.xy, Pf0.z));
 float n001 = norm1.x * dot(g001, vec3(Pf0.xy, Pf1.z));
 float n011 = norm1.y * dot(g011, vec3(Pf0.x, Pf1.yz));
 float n101 = norm1.z * dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
 float n111 = norm1.w * dot(g111, Pf1);

 vec3 fade_xyz = fade(Pf0);
 vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
 vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
 float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
 return 2.2 * n_xyz;
}

// demo code:
float color(vec2 xy) {
   float iTime = uTime;
  return cnoise(vec3(1.5*xy, 0.3*iTime)); }
void main() {
   vec2 p = (vUv.xy) * 2.0 - 1.0;

   vec3 xyz = vec3(p, 0);

   vec2 step = vec2(1.3, 1.7);
   float n = color(xyz.xy);
   n += 0.5 * color(xyz.xy * 2.0 - step);
   // n += 0.25 * color(xyz.xy * 4.0 - 2.0 * step);
   // n += 0.125 * color(xyz.xy * 8.0 - 3.0 * step);
   // n += 0.0625 * color(xyz.xy * 16.0 - 4.0 * step);
   // n += 0.03125 * color(xyz.xy * 32.0 - 5.0 * step);

   vec3 purpleColor = vec3(137.0,117.0,165.0)/255.0;
   vec3 blueColor = vec3(151.0, 195.0, 233.0)/255.0;
   vec3 black = vec3(1.0);
   float yy = 0.5+0.5*n > 0.5 ? 1.0:0.0;
   // vec3 tarColor = uColor0/255.0;
   // vec3 tarColor = vec3(1.0);
   // vec3 tarColor = vec3(255.0,239.0,239.0)/255.0;
   vec3 tarColor = uLowColor;
   float x = 0.5+0.5*n;
   // if(x>=0.2&&x<=0.5)
   // {
   //   // float intensity = smoothstep(0.4,0.5,x);
   //   tarColor = mix(uHighColor,uLowColor,smoothstep(0.2,0.5,x)); 
   // }
   // else if(x>=0.0 &&x<=0.2){
   //   tarColor = mix(uLowColor,vec3(1.0),smoothstep(0.0,0.2,x));
   // }
   float intensity = texture(uDisplacementTexture,vUv).r;
   
   if(x>=0.5){
     tarColor = mix(uLowColor,uHighColor,smoothstep(0.4,1.0,x)); 
   }
   if(intensity != 0.0){
     tarColor = mix(tarColor,uLowColor,smoothstep(0.2,0.8,intensity));
   }
   // else{
   //  
   //   tarColor = intensity * tarColor;
   // }
   // if( x > 0.9){
   //   tarColor = uColor1;
   // }
   // else if (x>0.8 && x<=0.9){
   //   tarColor = uColor2;
   // }
   // else if(x>0.7 && x<=0.8){
   //   tarColor = uColor3;
   // }
   // else if(x>0.6 && x<=0.7){
   //   tarColor = uColor4;
   // }
   // else if(x>0.5 && x<=0.6){
   //   tarColor = uColor5;
   // }
   // else if( x>0.4 && x<=0.5){
   //   tarColor = uColor6;
   // }
   // else if(x>0.3 && x<=0.4){
   //   tarColor = uColor7;
   // }
   // else if(x>0.2 && x<=0.3){
   //   tarColor = uColor8;
   // }
   // else if(x>0.1 && x<=0.2){
   //   tarColor = uColor9;
   // }
   // else if(x<=0.1){
   //   tarColor = uColor10;
   // }
   // else if(0.5+0.5*n > 0.35){
   //   tarColor = vec4(uLowColor,1.0);
   // }
   // vec3 tarColor = mix(black,color,yy);
  // 0.5 + 0.5 * vec3(n, n, n)
   gl_FragColor = vec4(tarColor,0.9);

}
`

export default Perlin;