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
      <!-- <main v-for="(day, idx) in sortedData" :key="idx">
        <div class="week">
          <Day :data="day" />
        </div>
      </main>-->
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
  data() {
    return {
      sortedData: [],
    };
  },
  async asyncData(context) {
    const res = await getAndTransformData(SOURCE_DATA);
    console.log(res);
  },
};
</script>
