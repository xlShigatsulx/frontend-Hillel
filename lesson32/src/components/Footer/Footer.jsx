import { Link as MuiLink, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Box textAlign="center" py={2}>
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <MuiLink color="inherit" component={Link} to="/">
          Shigatsu
        </MuiLink>
        {` ${new Date().getFullYear()}.`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Контакты: shigatsu@gmail.com | +380 932 456 789
      </Typography>
    </Box>
  );
}
