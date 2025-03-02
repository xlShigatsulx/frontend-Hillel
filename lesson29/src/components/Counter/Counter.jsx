import { useSelector, useDispatch } from "react-redux";
import {
  selectCounter,
  increaseCount,
  decreaseCount,
} from "@ducks/counter.duck.js";
import style from "./Counter.module.scss";

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(selectCounter);

  function increaseHandler() {
    dispatch(increaseCount());
  }

  function decreaseHandler() {
    dispatch(decreaseCount());
  }

  return (
    <div className={style.container}>
      <h3>Value: {count}</h3>
      <div className={style.btn_grp}>
        <button onClick={increaseHandler}>+</button>
        <button onClick={decreaseHandler}>-</button>
      </div>
    </div>
  );
}
