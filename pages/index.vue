<template>
  <div class="root-container">
    <div>
      <h1 class="heading">Covid-19 Cases and Deaths in DC</h1>
      <p class="attribution">
        Data via
        <a href="https://github.com/nytimes/covid-19-data" target="_blank"
          >The New York Times</a
        >.
      </p>
      <p>
        There have been
        <span class="stat">{{ totalCases }} reported cases</span>
        and <span class="stat">{{ totalDeaths }} deaths</span> in DC as of
        <span>{{ latestDate }}</span
        >.
      </p>

      <section class="main__week-data">
        <h2 class="span-full">Week-Over-Week Change</h2>
        <radio-buttons class="span-full" />
        <week-card
          v-for="(week, idx) in weekCardData"
          class="main__week-card"
          :key="idx"
          :cases="week.cases"
          :cases-delta="week.casesDelta"
          :deaths-delta="week.deathsDelta"
          :deaths="week.deaths"
          :number="week.number"
          :start="week.start"
          :end="week.end"
        ></week-card>
      </section>
    </div>
  </div>
</template>

<script>
import { getAndTransformData } from "~/services/transform";
import { formatNum } from "~/services/numbers";
import RadioButtons from "~/components/RadioButtons";
import WeekCard from "~/components/WeekCard";

const SOURCE_DATA =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";

export default {
  components: {
    RadioButtons,
    WeekCard,
  },
  computed: {
    latestDate() {
      const latestDay = this.data.daily[this.data.daily.length - 1].date;

      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/New_York",
      };
      return latestDay.toLocaleString("en-US", options);
    },
    totalCases() {
      return formatNum(this.data.total.cases);
    },
    totalDeaths() {
      return formatNum(this.data.total.deaths);
    },
    updatedWeekData() {
      return Object.entries(this.data.weekly)
        .reduce((weekAcc, weekCurr, index) => {
          const data = {
            cases: weekCurr[1].reduce((acc, curr) => (acc += curr.cases), 0),
            deaths: weekCurr[1].reduce((acc, curr) => (acc += curr.deaths), 0),
            number: index + 1,
            start: weekCurr[1][0].date,
            end: weekCurr[1][weekCurr[1].length - 1].date,
          };

          if (index > 0) {
            let previousWeekCases = weekAcc[index - 1].cases;
            data.casesDelta = this.delta(previousWeekCases, data.cases);

            let previousWeekDeaths = weekAcc[index - 1].deaths;
            data.deathsDelta = this.delta(previousWeekDeaths, data.deaths);
          } else {
            data.casesDelta = "N/A";
            data.deathsDelta = "N/A";
          }
          weekAcc.push(data);
          return weekAcc;
        }, [])
        .reverse();
    },
    weekCardData() {
      return this.updatedWeekData;
    },
  },
  methods: {
    delta(prevStat, currStat) {
      if (prevStat === 0) {
        if (currStat === 0) {
          return 0;
        }
        prevStat = 1;
      }
      // Assuming both current and previous totals positive
      return ((currStat - prevStat) / prevStat) * 100;
    },
  },
  mounted() {
    window.data = this.data;
  },
  async asyncData(context) {
    return { data: await getAndTransformData(SOURCE_DATA) };
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/_index.scss";
// https://www.modularscale.com/?1&em&1.2

body {
  color: var(--grey);
}

h1,
h2 {
  font-family: "SF-Pro", Helvetica, sans-serif;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.488rem;
}

h2 {
  font-size: 2.074rem;
}

h3,
h4,
h5,
h6,
p,
label {
  font-family: "IBM Plex Sans", Helvetica, sans-serif;
}

p {
  font-size: 1rem;
  margin-bottom: 1.2rem;
}

a {
  color: var(--blue);
  font-style: italic;
}

.stat {
  font-weight: 700;
}

.root-container {
  max-width: 1000px;
  padding: 1rem 5rem;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
}
.main {
  &__week-card {
    flex-basis: 33%;
  }

  &__week-data {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 2rem;

    @supports (display: grid) {
      display: grid;
      grid-column-gap: 1rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
