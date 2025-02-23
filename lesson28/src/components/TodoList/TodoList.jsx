import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./TodoList.module.scss";
import { TodoSchema } from "@/services/TodoSchema.js";

export function TodoList({ todos, addTodo, removeTodo }) {
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
              Додати
            </button>
          </Form>
        )}
      </Formik>

      <ul className={styles.todoList}>
        {todos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            {todo}{" "}
            <button
              onClick={() => removeTodo(index)}
              className={styles.deleteButton}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
