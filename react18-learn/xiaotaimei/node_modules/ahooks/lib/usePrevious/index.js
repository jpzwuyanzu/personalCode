"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var react_1 = require("react");
var defaultShouldUpdate = function defaultShouldUpdate(a, b) {
  return !Object.is(a, b);
};
function usePrevious(state, shouldUpdate) {
  if (shouldUpdate === void 0) {
    shouldUpdate = defaultShouldUpdate;
  }
  var prevRef = (0, react_1.useRef)();
  var curRef = (0, react_1.useRef)();
  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }
  return prevRef.current;
}
exports["default"] = usePrevious;