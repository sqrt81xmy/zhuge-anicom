"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fragmentShader = '#ifdef GL_ES\n' + 'precision mediump float;\n' + '#endif\n' +
/*glsl*/
"\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform sampler2D uIntensityTexture;\n    varying float vRandom;\n    uniform float uTime;\n\n    varying vec3 vColor;\n            \n    void main()\n    {\n        // gl_FragColor = vTense * vec4(1.0, 1.0, 1.0, 1.0);\n        // gl_FragColor = vec4(uTime,0.0,0.0, 1.0);\n        gl_FragColor = vec4(vColor+0.1,1.0);\n        #include <tonemapping_fragment>\n        #include <colorspace_fragment>\n    }\n";
var _default = fragmentShader;
exports.default = _default;
//# sourceMappingURL=fragement.dev.js.map
