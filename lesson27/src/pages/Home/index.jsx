import { useState } from "react";
import { Footer, Header, PageLayout } from "@components";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <>
          <h1>Головна</h1>
          <div className={styles.todoContainer}>
            <h4>Task List</h4>
            <div className={styles.todoInput}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.inputField}
              />
              <button onClick={addTodo} className={styles.addButton}>
                Додати таску
              </button>
            </div>
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
        </>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
