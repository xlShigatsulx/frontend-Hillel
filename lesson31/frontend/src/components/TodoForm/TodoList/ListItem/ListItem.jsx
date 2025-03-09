//import { Button } from "@ui";
import { useState } from "react";
import style from "./ListItem.module.scss";
import { useDispatch } from "react-redux";
import { removeTodo } from "@store";

export function ListItem({ _id, title, completed }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);

  function removeHandler() {
    dispatch(removeTodo(_id));
  }
  function editHandler() {
    //dispatch(editTodo(id));
    console.log("edit todos");
  }
  function checkHandler() {
    //dispatch(checkTodo(id));
    console.log("checkbox check");
    setChecked((prev) => !prev);
  }

  return (
    <li className={style.item}>
      <div className={style.container}>
        <input type="checkbox" checked={checked} onChange={checkHandler} />
        <span className={style.span}>{title}</span>
      </div>
      <button className={style.editBtn} onClick={editHandler}>
        ✏️
      </button>
      <button className={style.removeBtn} onClick={removeHandler}>
        🗑️
      </button>
    </li>
  );
}
