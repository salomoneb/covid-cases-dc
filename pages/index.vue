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
      <main v-for="(week, weekIdx) in sortedCases" :key="uniqueId(weekIdx)">
        <p>Week: {{ weekNumber(weekIdx) }}</p>
        <div
          class="week"
          v-for="(day, dayIdx) in week[1]"
          :key="uniqueId(dayIdx)"
        >
          <p>{{ day }}</p>
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
