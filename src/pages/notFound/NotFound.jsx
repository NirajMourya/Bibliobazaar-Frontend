import { Stack, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography mt={8}>Page Not Found</Typography>
    </Stack>
  );
};

export default NotFound;
