import { groupDataByWeek } from "~/services/time";

export const getAndTransformData = async function (url) {
  return await fetch(url)
    .then((res) => res.text())
    .then((res) => res.split("\n").slice(1)) // Convert to array and remove headers
    .then(casesToJson) // Convert to JSON
    .then(filterDc) // Filter only DC
    .then(setDailyTotals)
    .then(sortData) // Sort by date
    .then(groupData);
};

export const calculateDelta = function (currWeek, prevWeek) {
  // If the previous week was 0
  if (prevWeek === 0) {
    // If the current week is also 0, there's been no change, return 0
    if (currWeek === 0) {
      return 0;
    }
    return currWeek * 100;
  }
  // Assuming both current and previous totals positive
  return ((currWeek - prevWeek) / prevWeek) * 100;
};

export const sum = function (arr, prop) {
  return arr.reduce((acc, curr) => {
    return (acc += curr[prop]);
  }, 0);
};

function groupData(data) {
  return {
    daily: data,
    weekly: groupDataByWeek(data),
    total: {
      cases: sum(data, "cases"),
      deaths: sum(data, "deaths"),
    },
  };
}

/**
 * Convert CSV cases to JSON
 * @param {Array} data
 * @returns {Object}
 */
function casesToJson(data) {
  return data.map((el) => {
    let [date, state, fips, cases, deaths] = el.split(",");
    cases = parseInt(cases, 10);
    deaths = parseInt(deaths, 10);

    return {
      date: new Date(`${date} 00:00:00 EST`),
      state: state,
      cases: cases,
      deaths: deaths,
    };
  });
}

/**
 * Sort data by date
 * @param {Array} data
 * @returns {Array}
 */
function sortData(data) {
  return [...data].sort((a, b) => a.date - b.date);
}

/**
 * Filter data for DC
 * @param {Array} data
 */
function filterDc(data) {
  return data.filter((el) => el.state === "District of Columbia");
}

/**
 * NYTimes gives us cumulative totals, so we need to find daily
 * @param {Object} data
 */
function setDailyTotals(data) {
  let runningCasesTotal = 0;
  let runningDeathsTotal = 0;

  let clonedData = [];

  for (let [idx, day] of data.entries()) {
    let clonedDay = { ...day };

    clonedDay.cases = Math.abs(runningCasesTotal - clonedDay.cases);
    clonedDay.deaths = Math.abs(runningDeathsTotal - clonedDay.deaths);

    runningCasesTotal += clonedDay.cases;
    runningDeathsTotal += clonedDay.deaths;

    clonedData.push(clonedDay);
  }

  return clonedData;
}
