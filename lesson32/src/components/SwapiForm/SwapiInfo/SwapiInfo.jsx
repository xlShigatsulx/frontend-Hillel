import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearData, selectStatus, selectData } from "@ducks/data.duck.js";
import { Loader } from "@ui";
import {
  Card,
  CardContent,
  Badge,
  Button,
  Typography,
  Box,
} from "@mui/material";

function extractCategoryAndId(url) {
  if (!url) return { category: "", id: "" };
  const parts = url.split("/");
  return {
    category: parts[parts.length - 3] || "",
    id: parts[parts.length - 2] || "",
  };
}

export function SwapiInfo({ endpoint, handleClearData }) {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const data = useSelector(selectData);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (data?.url) {
      const { category, id } = extractCategoryAndId(data.url);
      setCategory(category);
      setId(id);
    } else {
      setCategory("");
      setId("");
    }
  }, [data]);

  if (status === "loading") return <Loader />;

  return (
    <>
      {endpoint && (
        <Card>
          <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
            {data?.url && (
              <Box>
                <Badge
                  color="secondary"
                  badgeContent={category}
                  sx={{ marginLeft: 5 }}
                />
                <Badge
                  color="secondary"
                  badgeContent={id}
                  sx={{ marginLeft: 10 }}
                />
              </Box>
            )}
            {data && Object.keys(data).length > 0 ? (
              <pre>
                <Typography variant="body2" component="div">
                  {JSON.stringify(data, null, 2)}
                </Typography>
              </pre>
            ) : (
              <Typography
                variant="body2"
                color="secondary"
                sx={{ fontSize: "20px" }}
              >
                Failed load data
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
      {data && Object.keys(data).length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(clearData());
            handleClearData();
          }}
          sx={{ marginTop: 2 }}
        >
          Clear
        </Button>
      )}
    </>
  );
}
