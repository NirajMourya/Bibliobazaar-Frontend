import { styled } from "@mui/material";

export const CustomFooter = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 'auto',
  position: 'sticky',
  top: '100%',
  padding: '24px 48px',
  minHeight: '64px',
  height: 'auto',
  background: theme?.palette?.grey,
}))

export const SocialContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '24px',
  'div:nth-of-type(1)': {
    display: 'flex',
    gap: '24px',
    'img': {
      cursor: 'pointer',
    }
  },
  'div:nth-of-type(2)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    'p': {
      cursor: 'pointer',
      '&:hover': {
        color: theme?.main
      }
    },
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}))

export const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const CopyrightContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '4px',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
}))