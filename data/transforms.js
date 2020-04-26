import { getFirstSunday } from "~/data/time";

const MS_IN_WEEK = 24 * 7 * 60 * 60 * 1000;

export const casesToJson = function (allCases) {
  return allCases.map((el) => {
    let [date, state, fips, cases, deaths] = el.split(",");

    cases = parseInt(cases, 10);
    deaths = parseInt(deaths, 10);

    return {
      date: date,
      state: state,
      cases: cases,
      deaths: deaths,
      fatality_percentage: Math.round((deaths / cases) * 10000) / 100,
    };
  });
};

export const sortData = function (data) {
  return [...data]
    .map((el) => {
      el.date = Date.parse(el.date);
      return el;
    })
    .sort((a, b) => a.date - b.date)
    .map((el) => {
      el.date = new Date(el.date);
      return el;
    });
};

export const filterDc = function (cases) {
  return cases.filter((d) => d.state === "District of Columbia");
};

export const getAndTransformData = async function (url) {
  try {
    const res = await fetch(url);
    const data = (await res.text()).split("\n").slice(1);
    const json = casesToJson(data);
    const dcData = filterDc(json);
    const sortedData = sortData(dcData);

    return groupDataByWeek(sortedData);
  } catch (err) {
    console.log(err);
  }
};

// fix all this tomorrow
function groupDataByWeek(sortedData) {
  const firstSunday = getFirstSunday(sortedData[0].date);
  let currSunday = Date.parse(firstSunday);

  return sortedData.reduce((acc, curr) => {
    let nextSunday = Date.parse(new Date(currSunday + MS_IN_WEEK));

    if (curr.date < nextSunday) {
    }

    if (!acc[currSunday]) {
      acc[currSunday] = [];
    }

    curr.date < nextSunday
      ? acc[currSunday].push(curr)
      : (currSunday = nextSunday);

    return acc;
  }, {});
}
