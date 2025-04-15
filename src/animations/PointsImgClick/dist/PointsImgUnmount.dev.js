"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function usePointsImgUnmount() {
  var handleOnClick = function handleOnClick(pointsImgRef, pointsNum) {
    pointsImgRef.current.updateGeometry(pointsNum);
  };

  return handleOnClick;
}

var _default = usePointsImgUnmount;
exports["default"] = _default;
//# sourceMappingURL=PointsImgUnmount.dev.js.map
