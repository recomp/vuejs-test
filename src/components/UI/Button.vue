<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="ui-button"
    :class="{ [`ui-button_${type}`]: type }"
    @click="$emit('submit')"
  >
    <slot />
  </button>
</template>

<script>
export default {

  name: 'UiButton',

  props: {
    type: String,
  },
};
</script>
