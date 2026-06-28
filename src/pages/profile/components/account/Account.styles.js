import { InputBase, Select, styled, Typography } from "@mui/material";

export const ProfileImageContainer = styled('div')(({ theme }) => ({
}));

export const ProfileImage = styled('img')(({ theme }) => ({
  width: "150px",
  height: "150px",
  borderRadius: "100%",
  background: theme?.palette?.lightGrey,
  border: `1px solid ${theme?.primary?.main}`,
}));

export const ProfileDummyImage = styled('div')(({ theme }) => ({
  width: "150px",
  height: "150px",
  borderRadius: "100%",
  background: theme?.palette?.lightGrey,
  border: `1px solid ${theme?.primary?.main}`,
}));

export const InputLabelText = styled(Typography)(({ theme }) => ({
  color: '#000000',
  fontSize: theme?.fontSize?.xs,
  fontWeight: 'bold'
}))

export const InputWrapper = styled('div')(() => ({
  width: '100%',
}))

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  width: '95% !important',
  borderRadius: '10px',
  '& .MuiInputBase-input': {
    borderRadius: '10px',
    position: 'relative',
    backgroundColor: 'transparent',
    border: `1px solid ${theme?.palette?.borderGrey}`,
    fontSize: theme?.fontSize?.xs,
    width: '100%',
    padding: '6px 12px',
    '&:focus': {
      borderColor: theme.primary.main,
    },
    '&:disabled': {
      backgroundColor: theme.palette.lightGrey,
      color: theme?.palette?.black
    }
  }
}));

export const CustomSelect = styled(Select)(() => ({
  width: '95%',
  borderRadius: '10px',
  '.MuiSelect-select': {
    padding: '8px 14px'
  }
}))

export const CustomSelectProfile = styled(Select)(() => ({
  width: '95%',
  borderRadius: '10px',
  marginTop: '20px',
  height: '50px',
  '.MuiSelect-select': {
    padding: '8px 14px'
  }
}))

export const CustomDate = styled('input')(({ theme }) => ({
  width: '95%',
  height: '36px',
  padding: '6px 12px',
  border: `1px solid ${theme?.palette?.borderGrey}`,
  borderRadius: '10px'
}))

