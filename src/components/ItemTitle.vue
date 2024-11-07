<template>
  <h4 class="item-title">
    {{ category.label }}
    <span v-if="category?.children?.length"
      >({{ category?.children?.length }})</span
    >

    <Tooltip
      v-if="category.label.length > 13"
      :label="`${category.label} (${category?.children?.length})`"
    />
  </h4>
</template>

<script setup>
import Tooltip from "./UI/Tooltip.vue";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
.item-title {
  margin: 0;
  max-width: 110px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  font-weight: bolder;
  line-height: 110%;
}

@media screen and (max-width: 500px) {
  .item-title {
    font-size: 10px;
  }
}
</style>
