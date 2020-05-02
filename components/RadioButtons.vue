<template>
  <div class="radio-buttons__container">
    <input
      class="sr-only radio-buttons__input"
      type="radio"
      id="one"
      name="common"
      value="one"
      checked
    />
    <label for="one" class="radio-buttons__button uppercase">One</label>

    <input
      class="sr-only radio-buttons__input"
      type="radio"
      id="two"
      name="common"
      value="two"
    />
    <label for="two" class="radio-buttons__button uppercase">Two </label>
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
    border: 1px solid var(--grey);
    border-radius: 5px;
    display: flex;
    margin-bottom: 1rem;
    width: max-content;
  }

  &__input:checked + .radio-buttons__button {
    background: var(--grey);
    color: #fff;
  }

  &__button {
    display: inline-block;
    font-size: 14px;
    padding: 2px 7px;
  }
}
</style>
