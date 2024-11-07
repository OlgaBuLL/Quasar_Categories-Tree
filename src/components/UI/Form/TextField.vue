<template>
  <q-input
    ref="textFieldEl"
    v-model="inputText"
    :outlined="outlined"
    :label="label"
    :dense="dense"
    :rules="props.rules"
    :placeholder="placeholder"
  >
    <template v-if="outlined" v-slot:append>
      <BaseIcon icon="check" class="cursor-pointer" @click="changeTitle" />
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseIcon from "../BaseIcon.vue";

const textFieldEl = ref();

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
    default: "",
  },
  dense: {
    type: Boolean,
    default: true,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  label: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  rules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const changeTitle = () => {
  emit("close", false);
};

const inputText = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

const validate = () => {
  return textFieldEl.value.validate();
};

const resetValidation = () => {
  return textFieldEl.value.resetValidation();
};

const hasError = computed(() => {
  return textFieldEl.value.hasError;
});

defineExpose({
  validate,
  resetValidation,
  hasError,
  el: textFieldEl,
  focus: () => {
    textFieldEl.value?.$el?.focus();
  },
});
</script>
