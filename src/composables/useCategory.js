export const useCategory = () => {
  const getMaxId = (nodes) => {
    let maxId = 0;

    const traverseNodes = (nodes) => {
      nodes.forEach((node) => {
        if (node.id > maxId) maxId = node.id;
        if (node.children && node.children.length > 0) {
          traverseNodes(node.children);
        }
      });
    };

    traverseNodes(nodes);

    return maxId;
  };

  const saveCategories = (categories) => {
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  return { getMaxId, saveCategories };
};
