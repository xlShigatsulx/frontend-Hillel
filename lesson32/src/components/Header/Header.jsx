import { Navigation } from "./Navigation";
import { ButtonGroup } from "./ButtonGroup";
import { Box, Typography } from "@mui/material";

export function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Box>
        <Typography variant="h5">LOGO</Typography>
      </Box>
      <Navigation />
      <ButtonGroup />
    </Box>
  );
}
