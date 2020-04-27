import { groupDataByWeek } from "~/data/time";

export const getAndTransformData = async function (url) {
  return await fetch(url)
    .then((res) => res.text())
    .then((res) => res.split("\n").slice(1))
    .then(casesToJson)
    .then(filterDc)
    .then(sortData)
    .then(groupDataByWeek)
    .then(appendWeeklyData);
};

/**
 * Calculate weekly totals and change
 * @param {Object} data
 * @returns {Object}
 */
function appendWeeklyData(data) {
  let augmented = {};
  let prevWeekKey = "";

  for (let [key, daily] of Object.entries(data)) {
    let weekly = {
      deaths: {
        total: sum(daily, "deaths"),
      },
      cases: {
        total: sum(daily, "cases"),
      },
    };

    // Week-over-week change
    if (prevWeekKey) {
      ["cases", "deaths"].forEach((prop) => {
        let prev = augmented[prevWeekKey].weekly[prop].total;
        let curr = weekly[prop].total;
        weekly[prop].change = delta(prev, curr);
      });
    }

    augmented[key] = {
      weekly,
      daily,
    };

    prevWeekKey = key;
  }
  return augmented;
}

function delta(prev, curr) {
  return ((curr - prev) / prev) * 100;
}

function sum(arr, prop) {
  return arr.reduce((acc, curr) => {
    return (acc += curr[prop]);
  }, 0);
}

/**
 * Convert CSV cases to JSON
 * @param {Array} allCases
 * @returns {Object}
 */
function casesToJson(allCases) {
  return allCases.map((el) => {
    let [date, state, fips, cases, deaths] = el.split(",");

    cases = parseInt(cases, 10);
    deaths = parseInt(deaths, 10);

    return {
      date: new Date(date),
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
 * @param {Array} cases
 */
function filterDc(cases) {
  return cases.filter((el) => el.state === "District of Columbia");
}
