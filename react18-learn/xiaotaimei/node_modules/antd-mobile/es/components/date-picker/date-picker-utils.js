import * as dateUtils from './date-picker-date-utils';
import * as weekUtils from './date-picker-week-utils';
const precisionLengthRecord = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
};
export const convertDateToStringArray = (date, precision) => {
  if (precision.includes('week')) {
    return weekUtils.convertDateToStringArray(date);
  } else {
    const datePrecision = precision;
    const stringArray = dateUtils.convertDateToStringArray(date);
    return stringArray.slice(0, precisionLengthRecord[datePrecision]);
  }
};
export const convertStringArrayToDate = (value, precision) => {
  if (precision.includes('week')) {
    return weekUtils.convertStringArrayToDate(value);
  } else {
    return dateUtils.convertStringArrayToDate(value);
  }
};
export const generateDatePickerColumns = (selected, min, max, precision, renderLabel, filter) => {
  if (precision.startsWith('week')) {
    return weekUtils.generateDatePickerColumns(selected, min, max, precision, renderLabel, filter);
  } else {
    return dateUtils.generateDatePickerColumns(selected, min, max, precision, renderLabel, filter);
  }
};
export const defaultRenderLabel = (precision, data) => {
  if (precision.includes('week')) {
    return weekUtils.defaultRenderLabel(precision, data);
  } else {
    return dateUtils.defaultRenderLabel(precision, data);
  }
};