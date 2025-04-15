"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsapTrial = require("gsap-trial");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function usePointsImgScale() {
  var handleOnClick = function handleOnClick(pointsImgRef, scale, delay, duration) {
    //delay和duration:s
    //抖抖抖 快
    var pointsRef = pointsImgRef.current.getPointsRef();
    var meshRef = pointsImgRef.current.getMeshRef();

    _gsapTrial.gsap.delayedCall(delay, function () {
      //变小
      _gsapTrial.gsap.to(pointsRef.current.scale, {
        x: scale.x,
        y: scale.y,
        duration: duration
      });

      _gsapTrial.gsap.to(meshRef.current.scale, {
        x: scale.x,
        y: scale.y,
        duration: duration
      });
    }); // pointsImgRef.current.updateGeometry(pointsNum)

  }; //回归原位置


  return handleOnClick;
}

var _default = usePointsImgScale;
exports["default"] = _default;
//# sourceMappingURL=PointsImgScale.dev.js.map
