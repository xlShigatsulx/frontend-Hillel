import { useRef } from "react";
import { addTodo } from "@/ducks/todos.duck.js";
import { useDispatch } from "react-redux";
import { TodoList } from "./TodoList";
import { Container, Paper, Box, TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export function TodoForm() {
  const todo = useRef(null);
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();

    if (!todo.current.value) return;

    const preparedData = {
      id: uuidv4(),
      title: todo.current.value,
      completed: false,
    };

    dispatch(addTodo(preparedData));
    e.target.reset();
  }

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
        }}
      >
        <h3>TODO</h3>
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <TextField
            inputRef={todo}
            label="Enter Todo"
            variant="outlined"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="secondary">
            Add Todo
          </Button>
        </Box>
        <TodoList />
      </Paper>
    </Container>
  );
}
