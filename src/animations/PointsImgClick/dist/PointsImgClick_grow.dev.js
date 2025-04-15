"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _three = require("three");

var _gsapTrial = require("gsap-trial");

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function usePointsImgClick_grow() {
  var _useState = (0, _react.useState)({
    position: {
      x: null,
      y: null
    },
    pointsImgRef: {
      current: null
    },
    scale: {
      x: null,
      y: null
    },
    pointsNum: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      click = _useState4[0],
      setClick = _useState4[1];

  (0, _react.useEffect)(function () {
    if (click == 1) {
      // click = 1;
      // materialRef.current.uniforms.uScrollNoSin.value = 0.0; 
      var pointsRef = state.pointsImgRef.current.getPointsRef();
      var geometryRef = state.pointsImgRef.current.getGeometryRef();
      var uTimeRef = state.pointsImgRef.current.getUTimeRef();
      var fduration = 600;
      ;

      _gsapTrial.gsap.to(pointsRef.current.position, {
        x: state.position.x,
        y: state.position.y,
        z: 0,
        duration: fduration / 1000
      });

      var duration = 800; //然后放大

      setTimeout(function () {
        _gsapTrial.gsap.to(uTimeRef.current, {
          value: duration / 1000,
          duration: duration / 1000
        });

        _gsapTrial.gsap.delayedCall(duration / 1000, function () {
          _gsapTrial.gsap.to(uTimeRef.current, {
            value: 0.0,
            duration: duration / 1000
          });
        });

        if (state.scale.x) {
          _gsapTrial.gsap.to(pointsRef.current.scale, {
            x: 1.6 * 1.15,
            y: 1.2 * 1.1 * 1.04,
            duration: 2 * duration / 1000
          });
        } else _gsapTrial.gsap.to(pointsRef.current.scale, {
          x: state.scale.x,
          y: state.scale.y,
          duration: 2 * duration / 1000
        });

        var geometry;
        if (!state.pointsNum) geometry = new _three.PlaneGeometry(1, 1, 400, 400);else geometry = _construct(_three.PlaneGeometry, [1, 1].concat(_toConsumableArray(state.pointsNum)));
        pointsRef.current.geometry.dispose(); // 清理旧的几何体

        pointsRef.current.geometry = geometry; // 更新几何体

        geometryRef.current = geometry;
        console.log("widthwidth", geometryRef.current);
      }, fduration);
    }
  }, [click]);

  var handleOnClick = function handleOnClick(_ref) {
    var pointsImgRef = _ref.pointsImgRef,
        position = _ref.position,
        scale = _ref.scale,
        pointsNum = _ref.pointsNum;
    console.log(click);
    setClick(function (click) {
      return !click;
    });
    setState(function () {
      return {
        'position': position,
        'scale': scale,
        'pointsNum': pointsNum,
        'pointsImgRef': pointsImgRef
      };
    });
  };

  return handleOnClick;
}

var _default = usePointsImgClick_grow;
exports["default"] = _default;
//# sourceMappingURL=PointsImgClick_grow.dev.js.map
