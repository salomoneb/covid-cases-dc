<template>
  <aside>
    <p>
      There were
      <span class="stat">{{ sumCurrentWeekData }} reported {{ dataType }}</span>
      this week, compared to
      <span class="stat">{{ sumPreviousWeekData }}</span> last week.
    </p>
  </aside>
</template>

<script>
export default {
  props: {
    dataType: {
      type: String,
    },
    sumCurrentWeekData: {
      type: Number | String,
      required: true,
    },
    sumPreviousWeekData: {
      type: Number | String,
      required: false,
    },
  },
};
</script>

<style></style>
