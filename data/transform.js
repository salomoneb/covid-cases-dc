import { groupDataByWeek } from "~/data/time";

export const getAndTransformData = async function (url) {
  return await fetch(url)
    .then((res) => res.text())
    .then((res) => res.split("\n").slice(1)) // Convert to array and remove headers
    .then(casesToJson) // Convert to JSON
    .then(filterDc) // Filter only DC
    .then(sortData) // Sort by date
    .then(groupData);
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
 * @param {Array} cases
 */
function filterDc(cases) {
  return cases.filter((el) => el.state === "District of Columbia");
}
