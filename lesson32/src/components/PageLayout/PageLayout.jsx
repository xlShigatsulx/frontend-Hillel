import { Box, Container } from "@mui/material";

export function PageLayout({
  renderHeader,
  renderFooter,
  renderContent,
  children,
}) {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "8px",
          minHeight: "100vh",
        }}
      >
        <Box component="header" sx={{ flex: "0 0 100%", height: "100px" }}>
          {typeof renderHeader === "function" ? renderHeader() : renderHeader}
        </Box>
        <Box component="main" sx={{ flex: "1 0 100%", height: "auto" }}>
          {renderContent ? renderContent() : children}
        </Box>
        <Box component="footer" sx={{ flex: "0 0 100%", height: "auto" }}>
          {typeof renderFooter === "function" ? renderFooter() : renderFooter}
        </Box>
      </Box>
    </Container>
  );
}
