import { Box, CircularProgress } from "@mui/material";

// Shown while a lazy-loaded route chunk is being fetched
const PageLoader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="60vh"
    >
      <CircularProgress sx={{ color: (theme) => theme.primary?.main }} size={36} />
    </Box>
  );
};

export default PageLoader;
