import { useRef } from "react";
import { addTodo } from "@store";
import { useDispatch } from "react-redux";
import { TodoList } from "./TodoList";
import { Button } from "@ui";

import style from "./TodoForm.module.scss";

export function TodoForm() {
  const todo = useRef(null);

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();

    if (!todo.current.value) return;

    const preparedData = {
      title: todo.current.value,
      completed: false,
    };

    dispatch(addTodo(preparedData));
    e.target.reset();
  }

  return (
    <>
      <div className={style.container}>
        <h3 className={style.title}>TODO</h3>
        <form onSubmit={submitHandler} className={style.form}>
          <input type="text" ref={todo} name="todo" className={style.input} />
          <Button type="submit">Add todo</Button>
        </form>
      </div>
      <TodoList />
    </>
  );
}
