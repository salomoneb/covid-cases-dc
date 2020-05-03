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
 * Returns a two dimensional array of weeks
 * @param {Array} sortedData
 * @returns {Array}
 */
export const groupDataByWeek = function (sortedData) {
  const MS_IN_WEEK = 24 * 7 * 60 * 60 * 1000;

  const firstSunday = getFirstSunday(sortedData[0].date);
  let currSunday = Date.parse(firstSunday);

  return sortedData.reduce(
    (weeks, day, index) => {
      let nextSunday = Date.parse(new Date(currSunday + MS_IN_WEEK));
      let currentDate = Date.parse(day.date);

      if (currentDate >= nextSunday) {
        currSunday = nextSunday;
        weeks.push([]);
      }

      let mostRecentWeekIndex = weeks.length - 1;
      weeks[mostRecentWeekIndex].push(day);
      return weeks;
    },
    [[]]
  );
};

/*
[
  [
    {
      cases: "",
      date: ""
    },
    {
      cases: "",
      date: ""
    }
  ],
]

*/
