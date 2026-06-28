import { Button, Paper, styled, Typography } from "@mui/material";

export const AddressPaper = styled(Paper)(({ theme }) => ({
  padding: "16px 32px"
}));

export const AddressName = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.xs,
  fontWeight: theme?.fontWeight?.xl
}));

export const TextContent = styled(Typography)(({ theme }) => ({
  
}));

export const Tag = styled('span')(({ theme }) => ({
  fontSize: theme?.fontSize?.vs,
  position: 'relative',
  bottom: "2px",
  padding: '4px',
  background: theme?.palette?.bgGrey,
  borderRadius: '10px'
}));

export const AddressButton = styled(Button)((({ theme, type }) => ({
  padding: '8px',
  borderRadius: '10px',
  textTransform: 'none',
  background: type === 'remove' ? theme?.palette?.removeBg: theme?.palette?.editBg,
  color: type === 'remove' ? theme?.palette?.removeColor: theme?.palette?.editColor,
  '&:hover': {
    transform: 'scale(1.05)',
    background: type === 'remove' ? theme?.palette?.removeBg: theme?.palette?.editBg,
  },
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.6
  },
})))

export const CancelButton = styled(Button)((({ theme, type }) => ({
  padding: '8px',
  borderRadius: '10px',
  textTransform: 'none',
  border: `1px solid ${theme?.palette?.borderGrey}`,
  background: theme?.palette?.white,
  color: theme?.palette?.black,
  '&:hover': {
    transform: 'scale(1.05)',
    background: theme?.palette?.white,
  },
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.6
  },
})))

export const DefaultAddressLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.xs
}))

export const NoAddressContent = styled(Typography)((({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100px'
})))