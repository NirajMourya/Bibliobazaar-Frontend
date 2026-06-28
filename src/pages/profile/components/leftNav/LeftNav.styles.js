import { styled, Typography } from "@mui/material";

export const NavItemDiv = styled(Typography)(({ active, theme }) => ({
  color: `${active ? theme?.primary?.main: ''}`,
  cursor: 'pointer'
}));