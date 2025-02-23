import { useState } from "react";
import { Footer, Header, PageLayout, TodoList } from "@components";

export function HomePage() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (todo.trim()) {
      setTodos([...todos, todo.trim()]);
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div>
          <h1>Головна</h1>
          <TodoList todos={todos} addTodo={addTodo} removeTodo={removeTodo} />
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
