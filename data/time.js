/**
 * Gets the first Sunday of the month
 * @param {Date} firstEntry
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
