<template>
  <div class="week">
    <pre>{{ JSON.stringify(week) }}</pre>
    <!-- <p>Date {{ date.toLocaleString("en") }}</p>
    <p>Cases {{ cases }}</p>
    <p>Deaths {{ deaths }}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    week: {
      type: Array,
      default: [],
    },
    weekNumber: {
      type: Number,
    },
  },
};
</script>

<style></style>
