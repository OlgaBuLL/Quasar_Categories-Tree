<template>
  <div class="tree-item q-pa-md" @click.stop @keypress.stop>
    <div class="">
      <TextField
        v-if="isTitleEdit"
        v-model="title"
        ref="nameFieldEl"
        outlined
        placeholder="Category name"
        :rules="[required]"
        @close="saveCategoriesToLocalStorage"
      />
      <ItemTitle v-else :category="node" @click="editTitle" />
    </div>

    <Actions
      :node="item"
      @edit="openEditModal"
      @add="(id) => emit('add', id)"
      @delete="(id) => emit('delete', id)"
    />
  </div>

  <DialogEdit
    v-if="isEditingModalOpened"
    v-model="isEditingModalOpened"
    :title="title"
    @close="closeEditModal"
    @update:modelValue="(newVal) => (isEditingModalOpened = newVal)"
    @update:title="(newVal) => (title = newVal)"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import { useValidationRules } from "src/composables/form/useValidationRules";
import ItemTitle from "./ItemTitle.vue";
import TextField from "./UI/Form/TextField.vue";
import Actions from "./Actions.vue";
import DialogEdit from "./UI/DialogEdit.vue";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "add", "delete"]);
const { required } = useValidationRules();

const nameFieldEl = ref();
const item = ref(props.node);
const title = ref(props.node.label);
const isTitleEdit = ref(false);
const isEditingModalOpened = ref(false);

const editTitle = () => {
  isTitleEdit.value = !isTitleEdit.value;
};

const openEditModal = (newVal) => {
  isEditingModalOpened.value = newVal;
};

const closeEditModal = (newVal) => {
  isEditingModalOpened.value = newVal;
};

const saveCategoriesToLocalStorage = (newVal) => {
  if (nameFieldEl.value && !nameFieldEl.value.validate()) {
    return;
  }

  const storedCategories = JSON.parse(
    localStorage.getItem("categories") || "[]"
  );

  const updateCategory = (nodes) => {
    nodes.forEach((node) => {
      if (node.id === item.value.id) {
        node.label = title.value;
      }
      if (node.children && node.children.length > 0) {
        updateCategory(node.children);
      }
    });
  };

  updateCategory(storedCategories);

  localStorage.setItem("categories", JSON.stringify(storedCategories));
  isTitleEdit.value = newVal;
};

watch(
  () => title.value,
  (newVal) => {
    title.value = newVal;
    item.value.label = title.value;
  }
);

defineExpose({
  validate: () => {
    nameFieldEl.value?.validate();
    return !nameFieldEl.value?.hasError;
  },
});
</script>

<style lang="scss">
.tree-item {
  display: grid;
  gap: 10px;
  border-radius: 10px;
  background: $white !important;
  box-shadow: rgba(34, 60, 80, 0.09) 0px 0px 15px 0px;
}
</style>
