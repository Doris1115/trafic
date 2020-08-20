export function yAxisFormatter(value, max) {
  if (max > 100000) {
    return (value / 100000).toFixed(1);
  } else if (max > 100000) {
    return (value / 100000).toFixed(1);
  } else if (max > 10000) {
    return (value / 10000).toFixed(1);
  } else if (max > 1000) {
    return (value / 1000).toFixed(1);
  } else {
    return value
  }
}
export function unitFormatter(max, unit) {
  if (max > 1000000) {
    return '/百万' + unit
  } else if (max > 100000) {
    return '/十万' + unit
  } else if (max > 10000) {
    return '/万' + unit
  } else if (max > 1000) {
    return '/千' + unit
  } else {
    return '/' + unit
  }
}

export default {
  unitFormatter,
  yAxisFormatter
}
