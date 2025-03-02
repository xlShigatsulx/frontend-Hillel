import { useSelector } from "react-redux";
import { selectTodos } from "@ducks/todos.duck.js";
import style from "./TodoList.module.scss";

export function TodoList() {
  const todos = useSelector(selectTodos);

  return (
    <div className={style.container}>
      {todos.length > 0 && (
        <>
          <h3 className={style.title}>TODOS</h3>
          <ul className={style.list}>
            {todos.map(({ todo, id }) => (
              <li className={style.item} key={id}>
                {todo}
              </li>
            ))}
            <span className={style.lengthList}>Всього: {todos.length}</span>
          </ul>
        </>
      )}
    </div>
  );
}
