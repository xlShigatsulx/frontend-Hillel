import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, editTodo } from "@ducks/todos.duck.js";
import { Box, Checkbox, TextField, Button } from "@mui/material";

export function ListItem({ id, title, completed }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  function removeHandler() {
    dispatch(removeTodo(id));
  }
  function editHandler() {
    setIsEditing(true);
  }
  function cancelHandler() {
    setNewTitle(title);
    setIsEditing(false);
  }

  function saveHandler() {
    if (newTitle.trim()) {
      dispatch(editTodo({ id, updatedTitle: newTitle }));
    }
    setIsEditing(false);
  }

  function checkHandler() {
    if (!isEditing) setChecked((prev) => !prev);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Checkbox
        checked={checked}
        onChange={checkHandler}
        disabled={isEditing}
      />
      {isEditing ? (
        <TextField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus
          variant="outlined"
          size="small"
          fullWidth
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <span>{title}</span>
        </Box>
      )}
      <Box sx={{ ml: "auto", display: "flex", gap: "10px" }}>
        {isEditing ? (
          <>
            <Button onClick={saveHandler} variant="contained" size="small">
              Save
            </Button>
            <Button onClick={cancelHandler} variant="outlined" size="small">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={editHandler} variant="outlined" size="small">
              Edit
            </Button>
            <Button
              onClick={removeHandler}
              variant="outlined"
              color="error"
              size="small"
            >
              Remove
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
