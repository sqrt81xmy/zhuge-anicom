"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsapTrial = _interopRequireDefault(require("gsap-trial"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function LoadRow(selectors) {
  //为了不影响您的dom结构，请您传入一个数组
  _gsapTrial["default"].fromTo(selectors, {
    y: 80
  }, {
    duration: 1.5,
    y: 0,
    stagger: 0.05,
    ease: "back.in"
  });
}

var _default = LoadRow;
exports["default"] = _default;
//# sourceMappingURL=LoadRow.dev.js.map
