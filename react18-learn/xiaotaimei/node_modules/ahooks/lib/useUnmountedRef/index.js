"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var react_1 = require("react");
var useUnmountedRef = function useUnmountedRef() {
  var unmountedRef = (0, react_1.useRef)(false);
  (0, react_1.useEffect)(function () {
    unmountedRef.current = false;
    return function () {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};
exports["default"] = useUnmountedRef;