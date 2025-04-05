import styles from "./TodoList.module.scss";
import { useTodos } from "@context";

export function TodoList() {
  const { state, dispatch } = useTodos();

  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  return (
    <ul className={styles.todoList}>
      {state.todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          {todo.text}
          <button
            onClick={() => removeTodo(todo.id)}
            className={styles.deleteButton}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}
