"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsapTrial = require("gsap-trial");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function usePointsImgPosition() {
  var handleOnClick = function handleOnClick(pointsImgRef, position) {
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.6;
    var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.8;
    //duration,delay:s 
    //抖抖抖 快
    var pointsRef = pointsImgRef.current.getPointsRef();
    var meshRef = pointsImgRef.current.getMeshRef();

    _gsapTrial.gsap.delayedCall(delay, function () {
      _gsapTrial.gsap.to(pointsRef.current.position, {
        x: position.x,
        y: position.y,
        z: 0,
        duration: duration
      });

      _gsapTrial.gsap.to(meshRef.current.position, {
        x: position.x,
        y: position.y,
        z: 0,
        duration: duration
      });
    }); // pointsImgRef.current.updateGeometry(pointsNum)

  }; //回归原位置


  return handleOnClick;
}

var _default = usePointsImgPosition;
exports["default"] = _default;
//# sourceMappingURL=PointsImgPosition.dev.js.map
