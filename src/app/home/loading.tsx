import { Box, CircularProgress } from "@mui/joy";

export default function Loading() {
  return (
    <Box sx={{ alignItems: "center", display: "flex", height: "100%", justifyContent: "center" }}>
      <CircularProgress size="lg" />
    </Box>
  );
}
