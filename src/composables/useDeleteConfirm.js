import { useQuasar } from "quasar";

export const useDeleteConfirm = () => {
  const $q = useQuasar();

  const confirm = (categoryName) => {
    return new Promise((resolve) => {
      $q.dialog({
        title: "Confirm deleting",
        message: `Delete "${categoryName}"?`,
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          resolve(true);
        })
        .onCancel(() => {
          resolve(false);
        })
        .onDismiss(() => {
          resolve(false);
        });
    });
  };

  return { confirm };
};
