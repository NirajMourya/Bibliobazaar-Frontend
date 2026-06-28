import { Box, Paper, styled, Typography } from "@mui/material";

export const FilterBtn = styled(Box)((({ theme }) => ({
  // padding: '8px 24px',
  // borderRadius: '10px',
  // background: theme?.palette?.grey
})))

export const FilterContainer = styled(Paper)((({ theme }) => ({
  padding: '16px 24px',
})))

export const CardContainer = styled(Box)((({ theme }) => ({
  width: '100%',
})))

export const NoBooksContent = styled(Typography)((({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100px'
})))