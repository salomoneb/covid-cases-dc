<template>
  <div class="container">
    <div>
      <h1>Covid-19 Cases and Deaths in DC</h1>
      <p>
        Data via
        <a href="https://github.com/nytimes/covid-19-data"
          >The New York Times</a
        >
      </p>
      <main class="cases">
        <!-- <Week
          v-for="(week, idx) in reversedWeeks"
          :key="idx"
          :week="week"
          :weekNumber="weekNumber(idx)"
        /> -->
        {{ test }}
      </main>
    </div>
  </div>
</template>

<script>
import { getAndTransformData } from "~/data/transforms";
import { groupDataByWeek } from "~/data/time";

import Week from "~/components/Week";

const SOURCE_DATA =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";

export default {
  components: {
    Week,
  },
  computed: {
    // parsedData() {
    //   const weeks = Object.entries(this.groupedByWeekCases);
    //   return weeks.reduce((acc, [key, val], idx) => {
    //     acc[key] = {
    //       weekData: {
    //         cases: this.sumTotal(val.filter((el) => el.cases)),
    //         deaths: this.sumTotal(val.filter((el) => el.deaths)),
    //       },
    //       cases: [val],
    //     };
    //     return acc;
    //   }, {});
    // },
    test() {
      return this.groupedByWeekCases[1587272400000].reduce(
        (acc, val) => (acc += val.cases),
        0
      );
    },
    groupedByWeekCases() {
      return groupDataByWeek(this.cases);
    },
    reversedWeeks() {
      // Sort in reverse-chronological order
      return Object.entries(this.groupedByWeekCases).sort(
        (a, b) => b[0] - a[0]
      );
    },
  },
  methods: {
    sumTotal(arr) {
      return arr.reduce((acc, curr) => (acc += curr));
    },
    weekNumber(idx) {
      return this.groupedByWeekCases.length - idx;
    },
  },
  async asyncData(context) {
    return { cases: await getAndTransformData(SOURCE_DATA) };
  },
};
</script>

<style>
.container {
  font-family: "Georgia";
  margin-left: 5rem;
  margin-top: 1rem;
}
.cases {
  display: flex;
  flex-direction: column;
}
.week {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 1rem;
  margin-top: 2rem;
}
.week__number {
  order: 1;
  grid-column: 8;
}
</style>
