<template>
  <q-tree
    :nodes="categories"
    node-key="id"
    v-model:expanded="expanded"
    class="tree q-my-lg q-pb-lg flex column q-gutter-sm"
  >
    <template v-slot:default-header="{ node }">
      <TreeItem
        :node="node"
        @add="addChildCategory"
        @delete="(item) => onDelete(item)"
      />
    </template>
  </q-tree>

  <BaseButton
    label="Add root category"
    icon="add"
    color="primary"
    filled
    @click="addRootCategory"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDeleteConfirm } from "../composables/useDeleteConfirm";
import { useCategory } from "src/composables/useCategory";
import BaseButton from "../components/UI/BaseButton.vue";
import TreeItem from "./TreeItem.vue";

const { confirm } = useDeleteConfirm();
const { getMaxId, saveCategories } = useCategory();

const expanded = ref([]);
const categories = ref([]);

const loadCategories = () => {
  const storedCategories = localStorage.getItem("categories");
  if (storedCategories) {
    categories.value = JSON.parse(storedCategories);
  } else {
    categories.value = [
      {
        id: 1,
        label: "Мебель",
        header: "root",
        children: [
          {
            id: 2,
            label: "Мебель для дома",
            header: "generic",
            children: [],
          },
        ],
      },
      {
        id: 3,
        label: "Обувь",
        header: "root",
        children: [
          {
            id: 4,
            label: "Женская обувь",
            header: "generic",
            children: [],
          },
          {
            id: 5,
            label: "Мужская обувь",
            header: "generic",
            children: [],
          },
        ],
      },
    ];
  }
};

const addRootCategory = () => {
  const maxId = getMaxId(categories.value);

  const newItem = {
    id: maxId + 1,
    label: "New category",
    header: "root",
    children: [],
  };

  categories.value.push(newItem);
  saveCategories(categories.value);
};

const addChildCategory = (parentId) => {
  const maxId = getMaxId(categories.value);

  const newItem = {
    id: maxId + 1,
    label: "New child category",
    header: "generic",
    children: [],
  };

  const findNode = (nodes) => {
    for (let node of nodes) {
      if (node.id === parentId) {
        node.children.push(newItem);
        expanded.value.push(parentId);
        return true;
      }
      if (node.children && node.children.length > 0) {
        const found = findNode(node.children);
        if (found) return true;
      }
    }
    return false;
  };

  findNode(categories.value);
  saveCategories(categories.value);
};

const onDelete = async (node) => {
  const confirmed = await confirm(node.label);

  if (confirmed) {
    deleteChildCategory(node.id);
  }
};

const deleteChildCategory = (id) => {
  const deleteNode = (nodes, idToDelete) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.id === idToDelete) {
        nodes.splice(i, 1);
        return true;
      }

      if (node.children && node.children.length > 0) {
        const found = deleteNode(node.children, idToDelete);
        if (found) return true;
      }
    }
    return false;
  };

  deleteNode(categories.value, id);
  saveCategories(categories.value);
};

onMounted(() => {
  loadCategories();
});
</script>

<style lang="scss">
.tree {
  overflow-x: auto;
}
</style>
