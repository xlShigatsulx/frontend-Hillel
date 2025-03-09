import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos, selectStatus, clearTodos } from "@store";
import { Button, Loader } from "@ui";
import { FETCH_TODOS } from "@store/todos/todos.actions.js";
import { ListItem } from "./ListItem/index.js";
import style from "./TodoList.module.scss";

export function TodoList() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const todos = useSelector(selectTodos);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(FETCH_TODOS(controller.signal));

    return () => {
      controller.abort();
    };
  }, []);

  if (status === "loading") return <Loader />;

  return (
    <div className={style.container}>
      {todos.length > 0 && (
        <>
          <h3 className={style.title}>TODOS</h3>
          <ul className={style.list}>
            {todos.map(({ _id, title, completed }) => (
              <ListItem
                key={_id}
                title={title}
                completed={completed}
                _id={_id}
              />
            ))}
          </ul>
          <Button
            className={style.button}
            onClick={() => dispatch(clearTodos())}
          >
            Clear todos
          </Button>
        </>
      )}
    </div>
  );
}
