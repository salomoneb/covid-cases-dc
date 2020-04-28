<template>
  <div class="day">
    <p>{{ date }}</p>
    <p>Cases: {{ cases }}</p>
    <p>Deaths: {{ deaths }}</p>
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
        year: "numeric",
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
  border: 1px solid;
  border-radius: 3px;
  padding: 2rem 1rem;
}
</style>
