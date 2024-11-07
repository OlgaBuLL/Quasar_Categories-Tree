<template>
  <q-icon :name="props.icon" :size="props.size" :color="props.color" />
</template>

<script setup>
const props = defineProps({
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
});
</script>
