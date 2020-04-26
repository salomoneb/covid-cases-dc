<template>
  <div class="day">
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
}
</script>

<style>
</style>
