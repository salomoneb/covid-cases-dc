<template>
  <div class="radio-buttons__container">
    <template v-for="(button, idx) in buttons">
      <label
        :for="button.value"
        :key="idx"
        class="radio-buttons__button uppercase"
        tabindex="0"
      >
        <input
          class="sr-only radio-buttons__input"
          type="radio"
          :id="button.value"
          :name="button.name"
          :value="button.value"
          :checked="button.default"
          @change="$emit('delta-type', $event.target.value)"
        /><span>{{ button.value }}</span></label
      >
    </template>
  </div>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.radio-buttons {
  &__container {
    display: flex;
    margin-bottom: 1rem;
    width: max-content;
  }

  &__input:checked + span {
    background: var(--grey);
    color: #fff;
  }

  &__button span {
    border: 1px solid var(--grey);
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    padding: 2px 1rem;
  }

  &__button:first-of-type span {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &__button:last-of-type span {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &__button:not(:first-of-type) span {
    border-left: none;
  }
}
</style>
