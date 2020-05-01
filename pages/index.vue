<template>
  <div class="container">
    <div>
      <h1 class="heading">Covid-19 Cases and Deaths in DC</h1>
      <p class="attribution">
        Data sourced from
        <a href="https://github.com/nytimes/covid-19-data" target="_blank"
          >The New York Times</a
        >
      </p>
      <p>
        There have been a total of
        <span class="stat">{{ totalCases }} reported cases</span> and
        <span class="stat">{{ totalDeaths }} deaths</span> as of
        <span>{{ latestDate }}</span
        >.
        <!-- <main class="cases">
        <Week
          v-for="(week, idx) in reversedWeeks"
          :key="idx"
          :week="week[1].weekly"
          :days="week[1].daily"
        />
      </main> -->
      </p>
    </div>
  </div>
</template>

<script>
import Week from "~/components/Week";
import { getAndTransformData } from "~/data/transform";

const SOURCE_DATA =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";

export default {
  components: {
    Week,
  },
  computed: {
    latestDate() {
      const weeks = Object.values(this.cases);
      const latestWeek = weeks[weeks.length - 1];
      const days = Object.values(latestWeek.daily);

      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return days[days.length - 1].date.toLocaleString("en-US", options);
    },
    totalCases() {
      return this.sumStats("cases").toLocaleString();
    },
    totalDeaths() {
      return this.sumStats("deaths").toLocaleString();
    },
    reversedWeeks() {
      return Object.entries(this.cases).sort((a, b) => b[0] - a[0]);
    },
  },
  methods: {
    sumStats(prop) {
      return Object.values(this.cases).reduce((acc, week) => {
        return (acc += week.total[prop]);
      }, 0);
    },
  },
  mounted() {
    window.cases = this.cases;
    console.log(this.latestDate);
  },
  async asyncData(context) {
    return { cases: await getAndTransformData(SOURCE_DATA) };
  },
};
</script>

<style>
@font-face {
  font-family: "SF-Pro";
  font-weight: 700;
  src: url("~assets/fonts/SF-Pro-Text-Heavy.woff2");
}

@font-face {
  font-family: "IBM Plex Sans";
  font-weight: 400;
  src: url("~assets/fonts/IBMPlexSans-Regular.woff2");
}

@font-face {
  font-family: "IBM Plex Sans";
  font-weight: 500;
  src: url("~assets/fonts/IBMPlexSans-Medium.woff2");
}

@font-face {
  font-family: "IBM Plex Sans";
  font-weight: 700;
  src: url("~assets/fonts/IBMPlexSans-Bold.woff2");
}

:root {
  --blue: #0f73e8;
  --grey: #333;
}

body {
  color: var(--grey);
}

h1 {
  font-family: "SF-Pro", Helvetica, sans-serif;
  margin-bottom: 1rem;
}

p {
  font-family: "IBM Plex Sans", Helvetica, sans-serif;
  margin-bottom: 1.2rem;
}

a {
  color: var(--blue);
}

.attribution {
  font-style: italic;
}

.stat {
  font-weight: 700;
}

.container {
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
