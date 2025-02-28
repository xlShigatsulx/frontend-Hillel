import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  fetchData,
  selectData,
  selectStatus,
} from "@ducks/data.duck.js";
import { Loader } from "@ui";

export function Swapi() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const data = useSelector(selectData);
  const [inputValue, setInputValue] = useState("");
  const [endpoint, setEndpoint] = useState("");

  const parts = endpoint.split("/");
  const category = parts[0];
  const id = parts[1];

  const handleFetchData = () => {
    setEndpoint(inputValue);
    dispatch(fetchData(inputValue));
  };

  if (status === "loading") return <Loader />;

  return (
    <div className="container">
      <h1>SWAPI</h1>
      <div className="input-group mb-3">
        <span className="input-group-text">https://swapi.py4e.com/api/</span>
        <input
          type="text"
          className="form-control"
          placeholder="people/1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn btn-outline-secondary" onClick={handleFetchData}>
          Get info
        </button>
      </div>

      {endpoint && (
        <div className="card">
          <div className="card-body">
            <span className="badge bg-secondary me-2">{category}</span>
            <span className="badge bg-secondary">{id}</span>
            {data && Object.keys(data).length > 0 ? (
              <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
              <p>Need Load data</p>
            )}
          </div>
        </div>
      )}

      <button
        className="btn mt-3"
        onClick={() => {
          dispatch(clearData());
          setEndpoint("");
        }}
      >
        Clear
      </button>
    </div>
  );
}
