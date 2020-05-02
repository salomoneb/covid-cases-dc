<template>
  <div class="radio-buttons__container">
    <label
      ><input
        class="sr-only"
        type="radio"
        id="one"
        name="common"
        value="one"
      />One</label
    >
    <label
      ><input
        class="sr-only"
        type="radio"
        id="two"
        name="common"
        value="two"
      />Two
    </label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.radio-buttons {
  &__container {
    border: 1px solid;
    display: inline-block;
  }
}
</style>
