import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos, selectStatus } from "@store";
import { Button, Loader } from "@ui";
import { FETCH_TODOS, CLEAR_TODOS } from "@store";
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
  }, [dispatch]);

  if (status === "loading") return <Loader />;

  const handleClearTodos = () => {
    const controller = new AbortController();
    dispatch(CLEAR_TODOS(controller.signal));
  };

  return (
    <div className={style.container}>
      {todos.length > 0 && (
        <>
          <h3 className={style.title}>TODOS</h3>
          <ul className={style.list}>
            {todos.map((item) => {
              if (item) {
                const { _id, title, completed } = item;
                return (
                  <ListItem
                    key={_id}
                    title={title}
                    completed={completed}
                    _id={_id}
                  />
                );
              }
              return null;
            })}
          </ul>
          <Button className={style.button} onClick={handleClearTodos}>
            Clear todos
          </Button>
        </>
      )}
    </div>
  );
}
