import { Box, CircularProgress } from "@mui/material";

// Inherits currentColor so it matches button text / theme text color automatically
const Spinner = ({ size = 20, fullPage = false }) => {
  if (fullPage) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" py={4}>
        <CircularProgress size={size * 1.5} color="inherit" thickness={4} />
      </Box>
    );
  }
  return <CircularProgress size={size} color="inherit" thickness={5} />;
};

export default Spinner;
