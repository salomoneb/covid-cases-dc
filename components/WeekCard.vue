<template>
  <section>
    <p class="week__number"><span class="uppercase">Week</span> {{ number }}</p>
    <p class="week__delta--cases">
      Cases change
      {{ casesDelta }}
    </p>
    <p class="week__delta--deaths">
      Deaths change
      {{ deathsDelta }}
    </p>
    <p class="week__date--start">{{ start }}</p>
    <p class="week__date--end">{{ end }}</p>
  </section>
</template>

<script>
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
