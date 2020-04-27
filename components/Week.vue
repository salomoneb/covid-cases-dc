<template>
  <div class="week">
    <pre>{{ JSON.stringify(week) }}</pre>
    <!-- <p>Date {{ date.toLocaleString("en") }}</p>
    <p>Cases {{ cases }}</p>
    <p>Deaths {{ deaths }}</p>-->
  </div>
</template>

<script>
export default {
  props: {
    week: {
      type: Object,
      default: {},
    },
    days: {
      type: Object,
      default: {}
    }
  },
};
</script>

<style></style>
