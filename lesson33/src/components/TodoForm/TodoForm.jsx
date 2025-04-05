import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./TodoForm.module.scss";
import { TodoSchema } from "@services";
import { useTodos } from "@context";
import { TodoList } from "./TodoList";
import { v4 as uuid } from "uuid";

export function TodoForm() {
  const { dispatch } = useTodos();

  const addTodo = (text) => {
    const newTodo = {
      id: uuid(),
      text,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  return (
    <div className={styles.todoContainer}>
      <Formik
        initialValues={{ todo: "" }}
        validationSchema={TodoSchema}
        onSubmit={(values, { resetForm }) => {
          addTodo(values.todo);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.todoInput}>
            <div>
              <Field type="text" name="todo" className={styles.inputField} />
              <ErrorMessage
                name="todo"
                component="div"
                className={styles.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.addButton}
            >
              Добавить
            </button>
          </Form>
        )}
      </Formik>
      <TodoList />
    </div>
  );
}
