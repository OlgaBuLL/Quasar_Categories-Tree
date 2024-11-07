<template>
  <q-btn round :icon="icon" :size="size" :color="color" :outline="!filled">
    <Tooltip v-if="label" :label="label"
  /></q-btn>
</template>

<script setup>
import Tooltip from "./Tooltip.vue";

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  icon: {
    type: String,
    required: true,
    default: "",
  },

  size: {
    type: String,
    required: false,
    default: "sm",
  },

  color: {
    type: String,
    required: false,
    default: "#000000",
  },

  filled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss"></style>
