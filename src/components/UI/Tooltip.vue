<template>
  <q-tooltip
    max-width="250px"
    transition-show="scale"
    transition-hide="scale"
    :offset="[5, 5]"
    :delay="100"
    class="tooltip"
  >
    <slot> {{ label }} </slot>
  </q-tooltip>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.tooltip {
  background: $white;
  color: $primary;
  border-radius: 6px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: 9px;
  letter-spacing: 0.04em;
  text-align: center;
}
</style>
