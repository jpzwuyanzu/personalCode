import assignWith from 'lodash/assignWith';
export function mergeProps(...items) {
  function customizer(objValue, srcValue) {
    return srcValue === undefined ? objValue : srcValue;
  }
  let ret = Object.assign({}, items[0]);
  for (let i = 1; i < items.length; i++) {
    ret = assignWith(ret, items[i], customizer);
  }
  return ret;
}