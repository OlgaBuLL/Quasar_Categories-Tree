<template>
  <div class="row no-wrap justify-end q-gutter-sm">
    <BaseButton label="Edit" icon="edit" color="secondary" @click="editItem" />
    <BaseButton label="Delete" icon="delete" color="red" @click="deleteItem" />
    <BaseButton label="Add" icon="add" color="primary" @click="addItem" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "../components/UI/BaseButton.vue";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "add", "delete"]);

const node = ref(props.node);

const editItem = () => {
  emit("edit", true);
};

const addItem = () => {
  emit("add", node.value.id);
};

const deleteItem = () => {
  emit("delete", node.value);
};
</script>
