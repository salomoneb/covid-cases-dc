<template>
  <div class="week-card--container">
    <h3 class="week-card__number uppercase">{{ formattedWeekNumber }}</h3>
    <p class="week-card__range">{{ formattedDate }}</p>
    <p :class="['week-card__delta', deltaClass]">
      {{ deltaSymbol }}
      <span
        class="number"
        @mouseover="$emit('stat-mouseover', mouseoverData)"
        @mouseout="$emit('stat-mouseout', mouseoutData)"
      >{{ formattedDelta }}</span>
    </p>
  </div>
</template>

<script>
import { calculateDelta, sum } from "~/services/transform";
import { roundToHundredths } from "~/services/numbers";
import { getMonth } from "~/services/time";
export default {
  props: {
    currentWeek: {
      type: Array,
      required: true,
    },
    isFirstWeek: {
      type: Boolean,
      required: true,
      default: false,
    },
    previousWeek: {
      type: Array,
      required: false,
      default: () => [],
    },
    weekNumber: {
      type: Number,
      required: true,
    },
    weekType: {
      type: String,
      required: true,
    },
  },
  computed: {
    delta() {
      if (this.isFirstWeek) return "N/A";
      return calculateDelta(this.sumCurrentWeekData, this.sumPreviousWeekData);
    },
    deltaClass() {
      return {
        increase: this.delta > 0,
        decrease: this.delta < 0,
        neutral: isNaN(this.delta),
      };
    },
    deltaSymbol() {
      if (isNaN(this.delta)) return;

      if (this.delta > 0) {
        return "+";
      } else if (this.delta < 0) {
        return "-";
      }
    },
    mouseoverData() {
      return {
        isHovering: true,
        sumCurrentWeekData: this.sumCurrentWeekData,
        sumPreviousWeekData: this.sumPreviousWeekData
      }
    },
    mouseoutData() {
      return {
        isHovering: false,
        sumCurrentWeekData: "",
        sumPreviousWeekData: ""
      }
    },
    endingDay() {
      return this.currentWeek[this.currentWeek.length - 1].date;
    },
    endingDate() {
      return this.endingDay.getDate();
    },
    endingMonth() {
      return getMonth(this.endingDay.getMonth());
    },
    formattedDate() {
      if (this.currentWeek.length === 1) {
        return `${this.startingMonth} ${this.startingDate}`;
      }

      if (this.endingMonth !== this.startingMonth) {
        return `${this.startingMonth} ${this.startingDate}-${this.endingMonth} ${this.endingDate}`;
      }
      return `${this.startingMonth} ${this.startingDate}-${this.endingDate}`;
    },
    formattedDelta() {
      if (!isNaN(this.delta)) {
        return `${roundToHundredths(Math.abs(this.delta))}%`;
      }
      return this.delta;
    },
    formattedWeekNumber() {
      return `Week ${this.weekNumber}`;
    },
    startingDay() {
      return this.currentWeek[0].date;
    },
    startingDate() {
      return this.startingDay.getDate();
    },
    startingMonth() {
      return getMonth(this.startingDay.getMonth());
    },
    sumCurrentWeekData() {
      return sum(this.currentWeek, this.weekType);
    },
    sumPreviousWeekData() {
      return sum(this.previousWeek, this.weekType);
    },
  },
  mounted() {
    console.log(this.delta);
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
    font-size: 2rem;

    .number {
      border-bottom: 1px dotted var(--grey);
      cursor: help;
      display: inline-block;
      line-height: 1.1;
    }
  }
}
</style>
