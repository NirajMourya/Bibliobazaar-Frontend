import { Box, Paper, styled, Typography } from "@mui/material";

export const FilterBtn = styled(Box)((({ theme }) => ({
  // padding: '8px 24px',
  // borderRadius: '10px',
  // background: theme?.palette?.grey
})))

export const FilterContainer = styled(Paper)((({ theme }) => ({
  padding: '20px 24px',
  width: '100%',
  maxWidth: '280px',
  flexShrink: 0,
  position: 'sticky',
  top: '96px',
  alignSelf: 'flex-start',
  maxHeight: 'calc(100vh - 112px)',
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    position: 'static',
    maxWidth: 'none',
    maxHeight: 'none',
    overflowY: 'visible',
  },
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