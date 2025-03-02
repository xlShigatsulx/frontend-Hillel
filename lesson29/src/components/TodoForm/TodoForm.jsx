import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@ui";
import { v4 as uuidv4 } from "uuid";

import style from "./TodoForm.module.scss";

import { addTodo } from "@/ducks/todos.duck.js";

export function Form() {
  const todo = useRef(null);
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();

    const preparedData = {
      id: uuidv4(),
      [todo.current.name]: todo.current.value,
    };

    dispatch(addTodo(preparedData));
    e.target.reset();
  }

  return (
    <div className={style.container}>
      <h3 className={style.title}>TODO</h3>
      <form onSubmit={submitHandler} className={style.form}>
        <input type="text" ref={todo} name="todo" className={style.input} />
        <Button type="submit">Add todo</Button>
      </form>
    </div>
  );
}
