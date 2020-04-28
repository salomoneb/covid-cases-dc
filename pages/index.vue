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
        <Week
          v-for="(week, idx) in reversedWeeks"
          :key="idx"
          :week="week[1].weekly"
          :days="week[1].daily"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { getAndTransformData } from "~/data/transform";

import Week from "~/components/Week";

const SOURCE_DATA =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";

export default {
  components: {
    Week,
  },
  computed: {
    reversedWeeks() {
      return Object.entries(this.cases).sort((a, b) => b[0] - a[0]);
    },
  },
  mounted() {
    window.cases = this.cases;
  },
  async asyncData(context) {
    return { cases: await getAndTransformData(SOURCE_DATA) };
  },
};
</script>

<style>
.container {
  font-family: "Georgia";
  margin: 1rem 5rem;
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
</style>
