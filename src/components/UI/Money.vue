<template>
  <input
    type="number"
    v-model="valueInput"
    @input="onInput"
    class="ui-money"
  />
</template>

<script>
export default {
  name: 'UiMoney',
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      valueInput: '',
    };
  },
  methods: {
    onInput(event) {
      const value = event.target.value
        .replace(new RegExp(/[a-zA-Z]+/, 'g'), '')
        .replace(new RegExp(/^[а-яё -]+$/i, 'g'), '');
      this.valueInput = value;
      this.$emit('input', value);
    },
  },
};
</script>
