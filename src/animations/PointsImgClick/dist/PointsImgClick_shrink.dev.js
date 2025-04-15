"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _click = require("@testing-library/user-event/dist/click");

var _react = require("react");

var _gsapTrial = require("gsap-trial");

var _three = require("three");

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
    }); //   const geometry = new PlaneGeometry(1,1,200,200);
    //   pointsRef.current.geometry.dispose(); // 清理旧的几何体
    //   pointsRef.current.geometry = geometry; // 更新几何体
    //   geometryRef.current = geometry;  
    //抖抖抖 慢


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
    }); // gsap.to(pointsRef.current.position,{
    //     x:0, y:0,
    //     duration:2*duration/1000
    // })
    //meshRef


    _gsapTrial.gsap.to(meshRef.current.scale, {
      x: scale.x,
      y: scale.y,
      duration: 2 * duration / 1000
    }); // gsap.to(meshRef.current.position,{
    //     x:0, y:0,
    //     duration:2*duration/1000
    // })


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
//# sourceMappingURL=PointsImgClick_shrink.dev.js.map
