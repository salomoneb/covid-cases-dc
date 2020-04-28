<template>
  <div class="day">
    <p class="day__date">{{ date }}</p>
    <p class="day__stat day__stat--cases">
      <span>Cases</span>
      <span class="day__stat-number">{{ cases }}</span>
    </p>
    <p class="day__stat day__stat--deaths">
      <span>Deaths</span>
      <span class="day__stat-number">{{ deaths }}</span>
    </p>
  </div>
</template>

<script>
import { formatNum } from "~/helpers/numbers";
export default {
  props: {
    day: {
      type: Object,
      default: {},
    },
  },
  computed: {
    date() {
      const format = {
        weekday: "short",
        month: "long",
        day: "numeric",
      };

      return this.day.date.toLocaleString("en-US", format);
    },
    cases() {
      return formatNum(this.day.cases);
    },
    deaths() {
      return formatNum(this.day.deaths);
    },
  },
};
</script>
<style lang="scss">
.day {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: sans-serif;
  font-weight: 100;

  &__date {
    grid-column: 1 / span 2;
    grid-column-gap: 1rem;
  }

  &__stat {
    display: flex;
    flex-direction: column-reverse;
    width: min-content;

    &-number {
      font-size: 2rem;
    }
  }
}
</style>
