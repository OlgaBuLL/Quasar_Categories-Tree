export const useValidationRules = () => {
  const required = (val) => {
    return (val && val.toString().length > 0) || "Поле должно быть заполнено";
  };

  return {
    required,
  };
};
