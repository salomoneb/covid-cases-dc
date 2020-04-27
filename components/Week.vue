<template>
  <div class="week">
    {{ JSON.stringify(week) }}
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
    }
  },
};
</script>

<style></style>
