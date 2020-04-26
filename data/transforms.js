import { groupDataByWeek } from "~/data/time";

export const getAndTransformData = async function (url) {
  return await fetch(url)
    .then((res) => res.text())
    .then((res) => res.split("\n").slice(1))
    .then(casesToJson)
    .then(filterDc)
    .then(sortData)
    .then(groupDataByWeek);
};

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
      fatality_percentage: Math.round((deaths / cases) * 10000) / 100,
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
