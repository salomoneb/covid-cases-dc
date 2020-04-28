<template>
  <div class="week__container">
    <h2 class="week__number">Week {{ weekNumber }}</h2>
    <Day
      v-for="(day, idx) in days"
      :day="day"
      :key="idx"
      :style="gridColumn(day)"
      class="week__day"
    />
    <div class="week__total">
      <p class="week__total--cases">
        <span>Cases:</span>
        <span>{{ totalCases }}</span>
        <span>{{ casesChange }}%</span>
      </p>
      <p class="week__total--deaths">
        <span>Deaths:</span>
        <span>{{ totalDeaths }}</span>
        <span>{{ deathChange }}%</span>
      </p>
    </div>
  </div>
</template>

<script>
import Day from "~/components/Day";
import { formatNum, roundToHundredths } from "~/helpers/numbers";
export default {
  components: {
    Day,
  },
  props: {
    week: {
      type: Object,
      default: {},
    },
    days: {
      type: Array,
      default: [],
    },
    selection: {
      type: String,
    },
  },
  computed: {
    deathChange() {
      return roundToHundredths(this.week.deaths.change);
    },
    casesChange() {
      return roundToHundredths(this.week.cases.change);
    },
    totalDeaths() {
      return this.week.deaths.total;
    },
    totalCases() {
      return formatNum(this.week.cases.total);
    },
    weekNumber() {
      return this.week.number;
    },
  },
  methods: {
    gridColumn(day) {
      return { gridColumn: day.date.getDay() + 1 };
    },
  },
};
</script>

<style lang="scss">
.week {
  &__container {
    display: grid;
    grid-template-columns: repeat(8, minmax(150px, 1fr));
    grid-column-gap: 1rem;
    margin-top: 2rem;
  }

  &__number {
    font-family: "SF-Pro";
    grid-row: 1;
  }

  &__day {
    grid-row: 2;
  }

  &__total {
    font-family: Georgia;
    font-weight: 100;
    grid-row: 2;
    grid-column: 8;
  }
}
</style>
