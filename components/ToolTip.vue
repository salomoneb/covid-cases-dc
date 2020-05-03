<template>
  <aside></aside>
</template>

<script>
export default {
  props: {
    dataType: {
      type: String,
    },
    currentWeekNumber: {
      type: Number,
      required: true,
    },
    previousWeekNumber: {
      type: Number,
      required: false,
    },
  },
  computed: {
    upOrDown() {
      return this.currentWeekNumber >
    }
  }
};
</script>

<style></style>
