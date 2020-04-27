<template>
  <div class="container">
    <div>
      <h1>Covid-19 Cases and Deaths in DC</h1>
      <p>
        Data via
        <a href="https://github.com/nytimes/covid-19-data">The New York Times</a>
      </p>
      <main class="cases">
        <!-- <Week
          v-for="(week, idx) in reversedWeeks"
          :key="idx"
          :week="week"
          :weekNumber="weekNumber(idx)"
        />-->
      </main>
    </div>
  </div>
</template>

<script>
import { getAndTransformData, appendWeeklyData } from "~/data/transforms";
import { groupDataByWeek } from "~/data/time";

import Week from "~/components/Week";

const SOURCE_DATA =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";

export default {
  components: {
    Week,
  },
  computed: {
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
    weekNumber(idx) {
      return this.cases.length - idx;
    },
  },
  mounted() {
    console.log(this.cases)
    // console.log(appendWeeklyData(this.cases))
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
