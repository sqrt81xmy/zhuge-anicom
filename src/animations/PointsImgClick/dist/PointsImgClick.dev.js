"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _click = require("@testing-library/user-event/dist/click");

var _react = _interopRequireWildcard(require("react"));

var _gsapTrial = require("gsap-trial");

var _three = require("three");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function usePointsImgClick() {
  var handleOnClick = function handleOnClick(pointsImgRef, position, scale, pointsNum) {
    var duration = 800; //抖抖抖 快

    var pointsRef = pointsImgRef.current.getPointsRef();
    var geometryRef = pointsImgRef.current.getGeometryRef();
    var meshRef = pointsImgRef.current.getMeshRef();
    var uTimeRef = pointsImgRef.current.getUTimeRef();

    _gsapTrial.gsap.to(uTimeRef.current, {
      value: duration / 1000,
      duration: duration / 1000
    }); //抖抖抖 慢


    _gsapTrial.gsap.delayedCall(duration / 1000, function () {
      _gsapTrial.gsap.to(uTimeRef.current, {
        value: 0.0,
        duration: duration / 1000
      });
    }); //变小


    _gsapTrial.gsap.to(pointsRef.current.scale, {
      x: scale.x,
      y: scale.y,
      duration: 2 * duration / 1000
    });

    _gsapTrial.gsap.to(meshRef.current.scale, {
      x: scale.x,
      y: scale.y,
      duration: 2 * duration / 1000
    });

    var fduration = 600;
    ;

    _gsapTrial.gsap.delayedCall(2 * duration / 1000, function () {
      _gsapTrial.gsap.to(pointsRef.current.position, {
        x: position.x,
        y: position.y,
        z: 0,
        duration: fduration / 1000
      });

      _gsapTrial.gsap.to(meshRef.current.position, {
        x: position.x,
        y: position.y,
        z: 0,
        duration: fduration / 1000
      });
    });

    pointsImgRef.current.updateGeometry(pointsNum);
  }; //回归原位置


  return handleOnClick;
}

var _default = usePointsImgClick;
exports["default"] = _default;
//# sourceMappingURL=PointsImgClick.dev.js.map
