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
        <div
          class="week"
          v-for="(week, weekIdx) in sortedCases"
          :key="uniqueId(weekIdx)"
        >
          <p class="week__number">Week: {{ weekNumber(weekIdx) }}</p>
          <div
            class="day"
            v-for="({ date, cases, deaths, fatality_percentage },
            dayIdx) in week[1]"
            :key="uniqueId(dayIdx)"
          >
            <p>Date {{ date.toLocaleString("en") }}</p>
            <p>Cases {{ cases }}</p>
            <p>Deaths {{ deaths }}</p>
            <p>Fatality Percentage {{ fatality_percentage }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { getAndTransformData } from "~/data/transforms";

const SOURCE_DATA =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";

export default {
  // components: {
  //   Day
  // },
  computed: {
    sortedCases() {
      // Sort in reverse-chronological order
      return Object.entries(this.cases).sort((a, b) => b[0] - a[0]);
    },
  },
  methods: {
    uniqueId(num) {
      return num + +new Date();
    },
    weekNumber(weekIdx) {
      return this.sortedCases.length - weekIdx;
    },
  },
  async asyncData(context) {
    const data = await getAndTransformData(SOURCE_DATA);
    return { cases: data };
  },
};
</script>

<style>
.cases {
  display: flex;
  flex-direction: column;
}
.week {
  display: grid;
  grid-template-columns: repeat(minmax(auto, 8), 1fr);
  grid-column-gap: 1rem;
  margin-top: 2rem;
}
.week__number {
  order: 1;
  grid-column: 8;
}
</style>
