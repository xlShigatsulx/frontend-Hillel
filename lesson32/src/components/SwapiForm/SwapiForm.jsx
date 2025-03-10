import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "@ducks/data.duck.js";
import { SwapiInfo } from "./SwapiInfo";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export function SwapiForm() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [endpoint, setEndpoint] = useState("");

  const handleFetchData = () => {
    dispatch(fetchData(inputValue));
  };

  const handleClearData = () => {
    setInputValue("");
    setEndpoint("");
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="left">
          SWAPI
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ marginBottom: 2 }}
        >
          <Typography variant="body1">https://swapi.py4e.com/api/</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="people/1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant="outlined"
            color="primery"
            onClick={() => {
              handleFetchData();
              setEndpoint(inputValue);
            }}
          >
            Get Info
          </Button>
        </Box>
        <SwapiInfo endpoint={endpoint} handleClearData={handleClearData} />
      </Paper>
    </Container>
  );
}
