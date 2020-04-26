<template>
  <div class="week">
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
