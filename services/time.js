export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getMonth = function (idx) {
  return MONTHS[idx];
};

/**
 * Gets the first Sunday of the month
 * @param {Date} firstEntry
 * @returns {Date}
 */
export const getFirstSunday = function (firstEntry) {
  const year = firstEntry.getFullYear();
  const month = firstEntry.getMonth();
  const day = 1;

  const firstDate = new Date(year, month, 1);
  const firstDay = firstDate.getDay();

  let firstSundayDay = day;
  // If the month doesn't start on a Sunday
  if (firstDay > 0) {
    distance = 7 - firstDay;
    firstSundayDay = day + distance;
  }

  return new Date(year, month, firstSundayDay);
};

/**
 * Group Covid data by week
 * @param {Array} sortedData
 * @returns {Object}
 */
export const groupDataByWeek = function (sortedData) {
  const MS_IN_WEEK = 24 * 7 * 60 * 60 * 1000;

  const firstSunday = getFirstSunday(sortedData[0].date);
  let currSunday = Date.parse(firstSunday);
  let initial = {
    [currSunday]: [],
  };

  return sortedData.reduce((acc, curr) => {
    let nextSunday = Date.parse(new Date(currSunday + MS_IN_WEEK));

    if (curr.date > nextSunday) {
      currSunday = nextSunday;
      acc[currSunday] = [];
    }
    acc[currSunday].push(curr);
    return acc;
  }, initial);
};
