<template>
  <div class="week-card--container">
    <h3 class="week-card__number uppercase">{{ formattedWeekNumber }}</h3>
    <p class="week-card__range">{{ formattedDate }}</p>
    <p :class="['week-card__delta', deltaColor]">{{ formattedDelta }}</p>
  </div>
</template>

<script>
import { roundToHundredths } from "~/services/numbers";
import { getMonth } from "~/services/time";
export default {
  props: {
    cases: {
      type: Number,
      required: true,
      default: 0,
    },
    casesDelta: {
      type: Number | String,
      required: true,
      default: 0,
    },
    deaths: {
      type: Number,
      required: true,
      default: 0,
    },
    deathsDelta: {
      type: Number | String,
      required: true,
      default: 0,
    },
    number: {
      type: Number,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  computed: {
    deltaColor() {
      if (this.deltaVisible > 0) {
        return "increase";
      } else if (this.deltaVisible < 0) {
        return "decrease";
      }
    },
    deltaVisible() {
      return this[`${this.visible}Delta`];
    },
    endingDate() {
      return this.end.getDate();
    },
    endingMonth() {
      return getMonth(this.end.getMonth());
    },
    formattedDate() {
      if (this.endingMonth !== this.startingMonth) {
        return `${this.startingMonth} ${this.startingDate}-${this.endingMonth} ${this.endingDate}`;
      }
      return `${this.startingMonth} ${this.startingDate}-${this.endingDate}`;
    },
    formattedDelta() {
      if (!isNaN(this.deltaVisible)) {
        return this.deltaVisible > 0
          ? `+${roundToHundredths(this.deltaVisible)}%`
          : `${roundToHundredths(this.deltaVisible)}%`;
      }
      return this.deltaVisible;
    },
    formattedWeekNumber() {
      return `Week ${this.number}`;
    },
    startingDate() {
      return this.start.getDate();
    },
    startingMonth() {
      return getMonth(this.start.getMonth());
    },
  },
  data() {
    return {
      visible: "cases",
    };
  },
};
</script>

<style lang="scss">
.week-card {
  &__number {
    font-size: 1rem;
    font-weight: bold;
  }

  &__range {
    opacity: 0.8;
    margin-bottom: 0;
  }

  &__delta {
    display: inline-block;
    border-bottom: 1px dotted var(--grey);
    font-size: 2rem;
  }
}
</style>
