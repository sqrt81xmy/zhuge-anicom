const fragmentShader = '#ifdef GL_ES\n'+
'precision mediump float;\n' +
'#endif\n' + /*glsl*/`
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform sampler2D uIntensityTexture;
    varying float vRandom;
    uniform float uTime;

    varying vec3 vColor;
            
    void main()
    {
        // gl_FragColor = vTense * vec4(1.0, 1.0, 1.0, 1.0);
        // gl_FragColor = vec4(uTime,0.0,0.0, 1.0);
        gl_FragColor = vec4(vColor+0.1,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }
`
export default fragmentShader;