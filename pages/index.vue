<template>
  <div class="root-container">
    <h1 class="heading">Covid-19 Cases and Deaths in DC</h1>
    <p class="attribution">
      Data via
      <a href="https://github.com/nytimes/covid-19-data" target="_blank">The New York Times</a>.
    </p>
    <p>
      There have been
      <span class="stat">{{ totalCases }} reported cases</span>
      and
      <span class="stat">{{ totalDeaths }} deaths</span> in DC as of
      <span>{{ latestDate }}</span>.
    </p>
    <tool-tip
      :data-type="visibleWeekDataType"
      :sum-current-week-data="hoveredCurrentWeekTotal"
      :sum-previous-week-data="hoveredPreviousWeekTotal"
    ></tool-tip>
    <section class="main__week-data">
      <h2 class="span-full">Week-Over-Week Change</h2>
      <radio-buttons
        class="span-full"
        :buttons="this.$options.WEEK_BUTTON_DATA"
        name="common"
        @delta-type="setVisibleWeekDataType"
      />
      <week-card
        v-for="(week, idx) in reverseChronWeekData"
        class="main__week-card"
        @stat-mouseover="setToolTipData"
        @stat-mouseout="setToolTipData"
        :key="idx"
        :current-week="week"
        :previous-week="reverseChronWeekData[idx + 1]"
        :is-first-week="idx === reverseChronWeekData.length - 1"
        :week-number="reverseChronWeekData.length - idx"
        :week-type="visibleWeekDataType"
      ></week-card>
    </section>
  </div>
</template>

<script>
import { getAndTransformData } from "~/services/transform";
import { formatNum } from "~/services/numbers";
import ToolTip from "~/components/ToolTip";
import RadioButtons from "~/components/RadioButtons";
import WeekCard from "~/components/WeekCard";

const SOURCE_DATA =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";

export default {
  WEEK_BUTTON_DATA: [
    {
      value: "cases",
      name: "week-over-week-change",
      default: true,
    },
    {
      value: "deaths",
      name: "week-over-week-change",
      default: false,
    },
  ],
  components: {
    ToolTip,
    RadioButtons,
    WeekCard,
  },
  computed: {
    reverseChronWeekData() {
      return this.data.weekly.slice().reverse();
    },
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
  },
  data() {
    return {
      isHovering: false,
      hoveredCurrentWeekTotal: "",
      hoveredPreviousWeekTotal: "",
      visibleWeekDataType: "cases",
    };
  },
  methods: {
    setToolTipData(e) {
      this.isHovering = e.isHovering
      this.hoveredCurrentWeekTotal = e.sumCurrentWeekData
      this.hoveredPreviousWeekTotal = e.sumPreviousWeekData
    },
    setVisibleWeekDataType(e) {
      this.visibleWeekDataType = e;
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
