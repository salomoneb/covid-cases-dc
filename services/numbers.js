export const formatNum = function (num) {
  return num.toLocaleString();
};

export const roundToHundredths = function (num) {
  return Math.round(100 * num) / 100;
};
