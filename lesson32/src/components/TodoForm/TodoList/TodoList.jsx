import { useDispatch, useSelector } from "react-redux";
import { selectTodos, clearTodos } from "@ducks/todos.duck.js";
import { ListItem } from "./ListItem/index.js";
import { Box, Typography, List, Button } from "@mui/material";

export function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  return (
    <Box>
      {todos.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            TODOS
          </Typography>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {todos.map((item) => {
              if (item) {
                const { id, title, completed } = item;
                return (
                  <ListItem
                    key={id}
                    title={title}
                    completed={completed}
                    id={id}
                  />
                );
              }
              return null;
            })}
          </List>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(clearTodos())}
          >
            Clear todos
          </Button>
        </>
      )}
    </Box>
  );
}
