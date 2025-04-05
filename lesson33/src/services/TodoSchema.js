import * as yup from "yup";

export const TodoSchema = yup.object().shape({
  todo: yup
    .string()
    .min(5, "Мінімум 5 символи")
    .max(25, "Максимум 25 символов")
    .required("Поле обов'язкове"),
});
