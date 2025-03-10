import { useState } from "react";
import style from "./ListItem.module.scss";
import { useDispatch } from "react-redux";
import { UPDATE_TODO, DELETE_TODO } from "@store";

export function ListItem({ _id, title, completed }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  function removeHandler() {
    const controller = new AbortController();
    dispatch(
      DELETE_TODO({
        id: _id,
        signal: controller.signal,
      })
    );
  }

  function editHandler() {
    setIsEditing(true);
  }
  function cancelHandler() {
    setNewTitle(title);
    setIsEditing(false);
  }

  function saveHandler() {
    const controller = new AbortController();
    dispatch(
      UPDATE_TODO({
        id: _id,
        data: { title: newTitle, completed: checked },
        signal: controller.signal,
      })
    );
    setIsEditing(false);
  }

  function checkHandler() {
    if (!isEditing) {
      setChecked((prev) => {
        const newChecked = !prev;
        const controller = new AbortController();
        dispatch(
          UPDATE_TODO({
            id: _id,
            data: { completed: newChecked },
            signal: controller.signal,
          })
        );
        return newChecked;
      });
    }
  }

  return (
    <li className={style.item}>
      <div className={style.container}>
        <input
          type="checkbox"
          checked={checked}
          onChange={checkHandler}
          disabled={isEditing}
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <span className={style.span}>{title}</span>
        )}
      </div>
      {isEditing ? (
        <>
          <button className={style.saveBtn} onClick={saveHandler}>
            💾
          </button>
          <button className={style.cancelBtn} onClick={cancelHandler}>
            ❌
          </button>
        </>
      ) : (
        <>
          <button className={style.editBtn} onClick={editHandler}>
            ✏️
          </button>
          <button className={style.removeBtn} onClick={removeHandler}>
            🗑️
          </button>
        </>
      )}
    </li>
  );
}
