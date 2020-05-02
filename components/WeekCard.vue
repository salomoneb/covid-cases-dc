<template>
  <section>
    <p class="week__number"><span class="uppercase">Week</span> {{ number }}</p>
    <p class="week__delta--cases">
      Cases change
      {{ cases.change }}
    </p>
    <p class="week__delta--deaths">
      Deaths change
      {{ deaths.change }} total {{ deaths.total }}
    </p>
    <p class="week__date--start">{{ start }}</p>
    <p class="week__date--end">{{ end }}</p>
  </section>
</template>

<script>
export default {
  props: {
    cases: {
      type: Object,
      required: true,
      default: {},
    },
    deaths: {
      type: Object,
      required: true,
      default: {},
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
  filters: {
    roundToHundredths(val) {
      if (isNaN) return val;
      return Math.round(100 * num) / 100;
    },
    positiveNegative(val) {
      return val > 0 ? `+${val}%` : `${val}%`;
    },
  },
};
</script>

<style></style>
