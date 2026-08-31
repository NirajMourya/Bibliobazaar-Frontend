import { styled } from "@mui/material";

export const CustomFooter = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 'auto',
  position: 'sticky',
  top: '100%',
  padding: '24px 48px',
  minHeight: '64px',
  height: 'auto',
  background: theme?.palette?.background?.paper,
  borderTop: `1px solid ${theme?.palette?.divider}`,
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
      opacity: 0.75,
      transition: 'opacity 0.2s ease',
      '&:hover': {
        opacity: 1,
      },
    }
  },
  'div:nth-of-type(2)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    'p': {
      cursor: 'pointer',
      color: theme?.palette?.text?.secondary,
      transition: 'color 0.2s ease',
      '&:hover': {
        color: theme?.primary?.main
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
  color: theme?.palette?.text?.secondary,
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
}))