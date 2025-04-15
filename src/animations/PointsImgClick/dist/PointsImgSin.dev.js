"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsapTrial = require("gsap-trial");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function usePointsImgSin() {
  var handleOnClick = function handleOnClick(pointsImgRef, delay, duration) {
    //抖抖抖 快 
    var uTimeRef = pointsImgRef.current.getUTimeRef();

    _gsapTrial.gsap.delayedCall(delay, function () {
      _gsapTrial.gsap.to(uTimeRef.current, {
        value: duration / 2,
        duration: duration / 2
      }); // console.log("sin",uTimeRef,delay,duration)
      //抖抖抖 慢


      _gsapTrial.gsap.delayedCall(duration / 2, function () {
        _gsapTrial.gsap.to(uTimeRef.current, {
          value: 0.0,
          duration: duration / 2
        });
      });
    }); // pointsImgRef.current.updateGeometry(pointsNum)

  }; //回归原位置


  return handleOnClick;
}

var _default = usePointsImgSin;
exports["default"] = _default;
//# sourceMappingURL=PointsImgSin.dev.js.map
