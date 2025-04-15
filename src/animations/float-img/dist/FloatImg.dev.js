"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _gsapTrial = _interopRequireDefault(require("gsap-trial"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function useFloatImg(rootClassName, candidateImg, imgStyle) {
  var moveTimeRef = (0, _react.useRef)(null);
  var cntRef = (0, _react.useRef)(0);
  var previousCursor = (0, _react.useRef)({
    x: null,
    y: null
  });

  var handleMouseMove = function handleMouseMove(e) {
    //设计一个节流
    if (moveTimeRef.current != null) {
      return;
    }

    moveTimeRef.current = setTimeout(function () {
      moveTimeRef.current = null;
    }, 460); // console.log("e.x e.y",e.clientX,e.clientY); 鼠标移动的坐标点
    //下面获取鼠标移动的向量
    // const vectorX = e.clientX - lastMoveX.current;
    // const vectorY = e.clientY - lastMoveY.current;
    //让3个球往这边移动一点：
    // gsap.to(".animation-ball", {  y: 0.03 * vectorY, x: 0.03 * vectorX,
    //     duration: 0.6, opacity:1 });
    //下面获取坐标x、y,在这个坐标上放一些图片

    var x = e.clientX;
    var y = e.clientY; // console.log(x,0.77*window.innerWidth,x>0.77*window.innerWidth,y,window.innerHeight-0.18*window.innerWidth,y>0.82*window.innerWidth)
    // if(x>0.73*window.innerWidth&&y>window.innerHeight-0.22*window.innerWidth){
    //     console.log("return;")
    //     return ;//右下角按钮
    // }
    // if(x<0.23*window.innerWidth && y>window.innerHeight-0.18*window.innerWidth){
    //     console.log("return;")
    //     return;//左下角按钮
    // }

    if (previousCursor.current.x) {
      var preX = previousCursor.current.x;
      var preY = previousCursor.current.y;
      var dis = Math.abs(preX - x) + Math.abs(preY - y); // console.log(dis);

      if (dis < 30) {
        return;
      }
    }

    previousCursor.current.x = x;
    previousCursor.current.y = y;
    var img = document.createElement('img');
    var array = candidateImg;
    var len = array.length;
    var cur = cntRef.current;
    cntRef.current = cur + 1;
    var src = array[cur % len];
    img.src = src;
    img.style.position = 'fixed';
    img.style.top = "".concat(y, "px");
    img.style.left = "".concat(x, "px");
    img.style.width = '15%';
    img.style.height = '20%';
    img.style.borderRadius = '20px'; // img.style.transitionDuration = '1s';

    img.style.opacity = 0.7;
    img.style.transform = 'scale(0.5)'; // 判断是否是Map类型

    var isMap = imgStyle instanceof Map; // 获取键集合

    var keys = isMap ? _toConsumableArray(imgStyle.keys()) : Object.keys(imgStyle);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        // 获取值
        var value = isMap ? imgStyle.get(key) : imgStyle[key];
        img.style.setProperty(key, value); // console.log(key,imgStyle[key],imgStyle.get(key),img.style)
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var parent = document.getElementsByClassName(rootClassName)[0];
    parent.appendChild(img); // img.style.opacity = 1;
    // setTimeout(()=>{
    // },)

    _gsapTrial["default"].to(img, {
      duration: 0.8,
      scaleX: 1,
      scaleY: 1,
      opacity: 1
    });

    setTimeout(function () {
      _gsapTrial["default"].to(img, {
        duration: 0.5,
        scaleX: 0.5,
        scaleY: 0.5,
        opacity: 0
      });

      setTimeout(function () {
        parent.removeChild(img);
      }, 500);
    }, 1000);
  };

  return handleMouseMove;
}

var _default = useFloatImg;
exports["default"] = _default;
//# sourceMappingURL=FloatImg.dev.js.map
